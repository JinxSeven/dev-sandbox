using KnowledgeBaseApi.Models;
using KnowledgeBaseApi.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBaseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ActivitiesRepo _activityRepo;
        public ActivityController(ActivitiesRepo activityRepo)
        {
            _activityRepo = activityRepo;
        }

        [HttpGet]
        [Route("GetTaskActivities")]
        public IActionResult GetTaskActivities(Guid taskId)
        {
            try
            {
                var response = _activityRepo.GetTaskActivities(taskId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddNewActivity")]
        public IActionResult AddNewActivity(Activity activityData)
        {
            try
            {
                _activityRepo.AddNewActivity(activityData);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("Edit")]
        public IActionResult EditActivity(Activity activityData)
        {
            try
            {
                _activityRepo.EditActivity(activityData); return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult DeleteActivity(int activityId)
        {
            try
            {
                _activityRepo.DeleteActivity(activityId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
