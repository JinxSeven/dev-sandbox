using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PersonalBudgetManager.Data;
using System.Net.Security;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryRepo _categoryRepo;
        public CategoriesController(CategoryRepo categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        public IActionResult GetCategories(int user_id)
        {
            try
            {
                var result = _categoryRepo.GetCategories(user_id);
                if (result == null || !result?.Any())
                {
                    throw new InvalidOperationException("");
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
        [Route("AddCategory")]
        public IActionResult AddCateg(int user_id, string transactionType, string category)
        {
            try
            {
                _categoryRepo.AddCateg(user_id, transactionType, category);
                return Ok("Add category procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public IActionResult DelCategory(int id)
        {
            try
            {
                _categoryRepo.DeleteCategory(id);
                return Ok("Delete category procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
