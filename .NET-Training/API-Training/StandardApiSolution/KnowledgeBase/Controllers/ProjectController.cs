using Microsoft.AspNetCore.Mvc;
using TaskTracker.Data;
using TaskTracker.Repo;

namespace TaskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly ProjectRepo _projectRepo;

        public ProjectController(ProjectRepo projectRepo)
        {
            _projectRepo = projectRepo;
        }

        [HttpGet]
        [Route("GetProjectListByClientId")]
        public async Task<IActionResult> GetProjectListByClientId(Guid clientId)
        {
            try
            {
                var projectList = await _projectRepo.GetProjectListByClientId(clientId);
                return Ok(projectList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getProjectsByClientId")]
                public async Task<IActionResult> GetProjectsByClientId(Guid clientId)
        {
            try
            {
                var projectList = await _projectRepo.GetProjectsByClientId(clientId);
                return Ok(projectList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}