using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using TaskTracker.Data;
using TaskTracker.Models;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UsersRepo _userRepo;
        public UserController(UsersRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        [Route("GetUserStatsById")]
        public async Task<IActionResult> GetUserStatsByIdAsync(Guid userId)
        {
            try
            {
                var response = await _userRepo.GetUserStatsByUserId(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetLoggedUser")]
        public IActionResult GetLoggedUser(string username, string password)
        {
            try
            {
                var loggedUser = _userRepo.GetLoggedUser(username, password);
                return Ok(loggedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllAdminNames")]
        public async Task<IActionResult> GetAllAdminNames() {
            try 
            {
                var result = await _userRepo.GetAllAdminNames();
                return Ok(result);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllUserNames")]
        public async Task<IActionResult> GetAllUserNames() {
            try 
            {
                var result = await _userRepo.GetAllUserNames();
                return Ok(result);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddNewUser")]
        public IActionResult AddNewUser(User userData)
        {
            try
            {
                _userRepo.AddNewUser(userData);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
