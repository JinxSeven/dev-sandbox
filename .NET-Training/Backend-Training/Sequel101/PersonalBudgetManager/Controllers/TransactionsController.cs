using BudgetTrackerApp.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using PersonalBudgetManager.Data;
using System.Transactions;

namespace BudgetTrackerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        public readonly TransactionRepo _transactionRepo;
        public TransactionsController(TransactionRepo transactionRepo)
        {
            _transactionRepo = transactionRepo;
        }
    
        [HttpGet]
        public IActionResult GetUserTransactions(int user_id)
        {
            try
            {
                var result = _transactionRepo.GetUserTransactions(user_id);
                if (result == null)
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
        [Route("AddTransaction")]
        public IActionResult AddUserTransaction([FromBody] Models.Transaction transact)
        {
            if (string.IsNullOrWhiteSpace(transact.TransactionType) || (transact.TransactionType != "income" && transact.TransactionType != "expense"))
            {
                return BadRequest("Type must be either 'income' or 'expense'!");
            }
            try
            {
                _transactionRepo.AddUserTransaction(transact);
                return Ok("Add transaction procedure successfull!");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("EditTransaction")]
        public IActionResult EditUserTransaction([FromBody] Models.EditTransaction transact)
        {
            if (string.IsNullOrWhiteSpace(transact.TransactionType) || (transact.TransactionType != "income" && transact.TransactionType != "expense"))
            {
                return BadRequest("Type must be either 'income' or 'expense'!");
            }
            try
            {
                _transactionRepo.EditUserTransaction(transact);
                return Ok("Edit transaction data procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteTransaction")]
        public IActionResult DeleteTransaction(int transact_id)
        {
            try
            {
                _transactionRepo?.DeleteTransaction(transact_id);
                return Ok("Delete goal procedure successfull!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
