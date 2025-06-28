using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PersonalBudgetManager.Data;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepo _userRepo;
        public UsersController(UserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetUserDetails(int user_id)
        {
            try
            {
                var result = _userRepo.GetUserDetails(user_id);
                if (result == null || !result.Any())
                {
                    throw new InvalidOperationException("No records found for the specified user ID.");
                }
                return Ok(result);
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (IndexOutOfRangeException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Column not found: " + ex.Message);
            }
        }

        [HttpPost]
        [Route("AddUser")]
        public IActionResult AddUser(Models.User user)
        {
            try
            {
                _userRepo.AddUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("UserLogin")]
        public IActionResult ValidateUser(LoginCred loginCred)
        {
            try
            {
                var uId = _userRepo.ValidateUser(loginCred);
                if (uId == null) { return BadRequest(); }
                return Ok(uId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("EditUser")]
        public IActionResult EditUser(int user_id, string name, string email) {
            try
            {
                _userRepo.EditUser(user_id, name, email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPatch]
        [Route("ChangeUserPassword")]
        public IActionResult ChangeUserPassword(int user_id, string oldpass, string newpass) {
            try 
            {
                _userRepo.ChangeUserPassword(user_id, oldpass, newpass);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public IActionResult DeleteUser(int user_id)
        {
            try
            {
                _userRepo.DeleteUser(user_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
