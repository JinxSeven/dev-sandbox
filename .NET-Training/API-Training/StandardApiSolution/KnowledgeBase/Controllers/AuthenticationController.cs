using KnowledgeBaseApi.Models;
using KnowledgeBaseApi.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBaseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UsersRepo _userRepo;
        private readonly IConfiguration _config;
        private readonly ILogger _logger;

        public AuthenticationController(UsersRepo userRepo, IConfiguration config, ILogger logger)
        {
            _userRepo = userRepo;
            _config = config;
            _logger = logger;
        }

        public record AuthenticationData(string? Username, string? Password);

        [HttpPost("TokenAuth")]
        public async Task<ActionResult<User>> AuthenticateUser([FromBody] AuthenticationData data)
        {
            var user = await ValidateUser(data);

            if (user is null)
            {
                return Unauthorized();
            }

            var jwt = GenerateJWToken((User)user);

            return Ok(jwt);
        }

        private string GenerateJWToken(User user)
        {
            SymmetricSecurityKey secretKey = new
                (
                    Encoding.ASCII.GetBytes(_config.GetValue<string>("Authentication:SecretKey")!)
                );

            SigningCredentials signingCredentials = new(secretKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new();
            claims.Add(new(JwtRegisteredClaimNames.Jti, user.Id.ToString()));
            claims.Add(new(JwtRegisteredClaimNames.UniqueName, user.Username));
            claims.Add(new(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User"));

            var token = new JwtSecurityToken
                (
                    _config.GetValue<string>("Authentication:Issuer"),
                    _config.GetValue<string>("Authentication:Audience"),
                    claims,
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddMinutes(1.5),
                    signingCredentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("ValidateUser")]
        private async Task<User?> ValidateUser([FromBody] AuthenticationData data)
        {
            User? loggedUser = null;
            try
            {
                loggedUser = await _userRepo.GetLoggedUser(data.Username, data.Password);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return loggedUser;
        }
    }
}
