using KnowledgeBaseApi.Models;
using KnowledgeBaseApi.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBaseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplianceController : ControllerBase
    {
        private readonly ComplianceRepo _complianceRepo;

        public ComplianceController(ComplianceRepo complianceRepo)
        {
            _complianceRepo = complianceRepo;
        }

        [HttpPost("AddNewCompliance")]
        public async Task<IActionResult> AddNewComplianceAsync([FromBody] Compliance compliance)
        {
            try
            {
                await _complianceRepo.AddNewComplianceAsync(compliance);
                return Ok(new { message = "Compliance added successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error adding compliance", error = ex.Message });
            }
        }

        [HttpPost("AssignCompliance")]
        public async Task<IActionResult> AssignCompliance(Guid userId, Guid compId) 
        {
            int rowsAffected = await _complianceRepo.AssignCompliance(userId, compId);
            if (rowsAffected == 1)
            {
                return Ok(new { Message = "Compliance assigned successfully." });
            }
            else if (rowsAffected == -1)
            {
                return StatusCode(409, new { message = "Error getting compliance" });
            }
            else
            {
                return BadRequest(new { Message = "Failed to assign compliance." });
            }
        }

        [HttpGet("GetComplianceDetails")]
        public async Task<IActionResult> GetComplianceDetails()
        {
            try
            {
                var response = await _complianceRepo.GetComplianceDetails();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error getting compliance", error = ex.Message });
            }
        }

        [HttpGet("GetAssignedCompliancesById")]
        public async Task<IActionResult> GetAssignedCompliancesById(Guid userId)
        {
            try
            {
                var response = await _complianceRepo.GetAssignedCompliancesById(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error getting compliance", error = ex.Message });
            }
        }

        [HttpGet("GetPptByComplianceId")]
        public async Task<IActionResult> GetPptByComplianceId(Guid compId)
        {
            try
            {
                var response = await _complianceRepo.GetPptByComplianceId(compId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error getting presentation", error = ex.Message });
            }
        }

        [HttpGet("GetQuestionsByCompliancesId")]
        public async Task<IActionResult> GetQuestionsByCompliancesId(Guid compId) {
            try 
            {
                var response = await _complianceRepo.GetQuestionsByCompliancesId(compId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error getting questions", error = ex.Message });
            }
        }
    }
}
