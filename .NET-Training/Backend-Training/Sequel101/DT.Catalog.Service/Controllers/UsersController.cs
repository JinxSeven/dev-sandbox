using DT.Catalog.Service.Entities;
using DT.Catalog.Service.Repos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace DT.Catalog.Service.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepo _usersRepo;

        public UsersController(UsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        [HttpPost("post")]
        public IActionResult PostUser(PostUser postUser)
        {
            try
            {
                Object? res = _usersRepo.PostUser(postUser);
                return Ok($"User inserted with Id: {res}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }
    }
}
