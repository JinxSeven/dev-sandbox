using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PersonalBudgetManager.Data;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly GoalRepo _goalRepo;
        public GoalsController(GoalRepo goalRepo)
        {
            _goalRepo = goalRepo;
        }

        [HttpGet]
        public IActionResult GetUserGoals(int user_id)
        {
            try
            {
                var result = _goalRepo.GetUserGoals(user_id);
                if (result == null || result.Count == 0)
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
        [Route("AddGoal")]
        public IActionResult AddUserGoal([FromBody] Models.Goal goal)
        {
            try
            {
                _goalRepo.AddUserGoal(goal);
                return Ok("Add Goal Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("EditGoal")]
        public IActionResult EditGoalData(int goal_id, string name, double target)
        {
            try
            {
                _goalRepo.EditGoalData(goal_id, name, target);
                return Ok("Edit Goal Data Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        [Route("ContributGoal")]
        public IActionResult ContributGoalAmount(int goal_id, double contribution)
        {
            try
            {
                _goalRepo.ContributGoalAmount(goal_id, contribution);
                return Ok("Edit Goal Data Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteGoal")]
        public IActionResult DeleteGoal(int goal_id)
        {
            try
            {
                _goalRepo.DeleteGoal(goal_id);
                return Ok("Delete Goal Procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
