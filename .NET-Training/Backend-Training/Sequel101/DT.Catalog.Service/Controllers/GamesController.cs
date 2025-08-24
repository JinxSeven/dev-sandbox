using DT.Catalog.Service.Entities;
using DT.Catalog.Service.Repos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

namespace DT.Catalog.Service.Controllers
{
    [ApiController]
    [Route("games")]
    public class GamesController : ControllerBase
    {
        private readonly GamesRepo _gamesRepo;

        public GamesController(GamesRepo gamesRepo)
        {
            _gamesRepo = gamesRepo;
        }

        [HttpPost("post")]
        public IActionResult PostGame([FromBody] PostGame game)
        {
            try
            {
                Object? res = _gamesRepo.PostGame(game);
                return Ok($"Game inserted with Id: {res}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }

        [HttpGet("get/{id}")]
        public IActionResult GetGamesById(Guid id)
        {
            try
            {
                var res = _gamesRepo.GetGameById(id);
                if (res == null)
                {
                    return NotFound("Unable to find the game your requesting!");
                }
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteGameById(Guid id)
        {
            try
            {
                _gamesRepo.DeleteGameById(id);
                return NoContent();
            }
            catch (SqlException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("put/{id}")]
        public IActionResult PutGameById(Guid id, PostGame updatedGame)
        {
            try
            {
                _gamesRepo.PutGameById(id, updatedGame);
                return Ok(new { Message = "Game update successful!", UpdatedGame = updatedGame });
            }
            catch (SqlException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("get")]
        public IActionResult GetGames()
        {
            try
            {
                List<Game> games = _gamesRepo.GetGames();
                if (games.Count == 0)
                {
                    return NotFound("No games were found!");
                }
                return Ok(games);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request. {ex.Message}");
            }
        }
    }
}
