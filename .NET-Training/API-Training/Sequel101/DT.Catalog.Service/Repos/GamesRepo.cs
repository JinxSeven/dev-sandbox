using DT.Catalog.Service.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace DT.Catalog.Service.Repos
{
    public class GamesRepo
    {
        private readonly IDataAccess _dataAccess;

        public GamesRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public Object? PostGame(PostGame game)
        {
            Object? res = null; 
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (SqlCommand postGameCmd = new SqlCommand("usp_InsertNewGame", connection))
                {
                    postGameCmd.CommandType = System.Data.CommandType.StoredProcedure;

                    postGameCmd.Parameters.AddWithValue("@GameName", game.GameName);
                    postGameCmd.Parameters.AddWithValue("@GameCategory", game.GameCategory);
                    postGameCmd.Parameters.AddWithValue("@GameDescription", game.GameDescription);
                    postGameCmd.Parameters.AddWithValue("@GamePrice", game.GamePrice);

                    res = postGameCmd.ExecuteScalar();
                }
            }
            return res;
        }

        public Object? GetGameById(Guid id)
        {
            using (SqlConnection connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (SqlCommand getGameByIdCmd = new SqlCommand("usp_GetGameById", connection))
                {
                    getGameByIdCmd.CommandType = System.Data.CommandType.StoredProcedure;

                    getGameByIdCmd.Parameters.AddWithValue("@GameId", id);
                    
                    using (SqlDataReader reader = getGameByIdCmd.ExecuteReader())
                    {
                        if (!reader.HasRows)
                        {
                            return null;
                        }

                        while (reader.Read())
                        {
                            return new Game
                            {
                                GameId = (Guid)reader["GameId"],
                                GameName = (string)reader["GameName"],
                                GameCategory = (string)reader["GameCategory"],
                                GameDescription = (string)reader["GameDescription"],
                                GamePrice = (decimal)reader["GamePrice"],
                                GameCreatedDate = (DateTimeOffset)reader        ["GameCreatedDate"]
                            };
                        }
                    }
                }
            }
            return null;
        }

        public void DeleteGameById(Guid id)
        {
            using (SqlConnection connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (SqlCommand deleteGameByIdCmd = new SqlCommand("usp_DeleteGameById", connection))
                {
                    deleteGameByIdCmd.CommandType = System.Data.CommandType.StoredProcedure;

                    deleteGameByIdCmd.Parameters.AddWithValue("@GameId", id);

                    try
                    {
                        deleteGameByIdCmd.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception($"{ex.Message}, Id: {id}", ex);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("An unexpected error occurred!", ex);
                    }
                }
            }
        }

        public void PutGameById(Guid id, PostGame updatedGame)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (var updateGameByIdCmd = new SqlCommand("usp_UpdateGameById", connection))
                {
                    updateGameByIdCmd.CommandType = System.Data.CommandType.StoredProcedure;

                    updateGameByIdCmd.Parameters.AddWithValue("@GameId", id);
                    updateGameByIdCmd.Parameters.AddWithValue("@GameName", updatedGame.GameName);
                    updateGameByIdCmd.Parameters.AddWithValue("@GameCategory", updatedGame.GameCategory);
                    updateGameByIdCmd.Parameters.AddWithValue("@GameDescription", updatedGame.GameDescription);
                    updateGameByIdCmd.Parameters.AddWithValue("@GamePrice", updatedGame.GamePrice);

                    try
                    {
                        updateGameByIdCmd.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception($"{ex.Message}, Id: {id}", ex);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("An unexpected error occurred!", ex);
                    }
                }
            }
        }

        public List<Game> GetGames()
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand getGamesCmd = new SqlCommand("SELECT * FROM Games", connection);
                var reader = getGamesCmd.ExecuteReader();

                var games = new List<Game>();
                while (reader.Read())
                {
                    Game game = new Game
                    {
                        GameId = (Guid)reader["GameId"],
                        GameName = (string)reader["GameName"],
                        GameCategory = (string)reader["GameCategory"],
                        GameDescription = (string)reader["GameDescription"],
                        GamePrice = (decimal)reader["GamePrice"],
                        GameCreatedDate = (DateTimeOffset)reader["GameCreatedDate"]
                    };
                    games.Add(game);
                }
                reader.Close();
                connection.Close();

                return games;
            }
        } 
    }
}
