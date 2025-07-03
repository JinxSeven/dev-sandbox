using Dapper;
using KnowledgeBaseApi.Models;
using KnowledgeBaseApi.Models.DTOs;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KnowledgeBaseApi.Repo;

public class UsersRepo
{
    private readonly IDataAccess _dataAccess;
    //private UserData loggerUser;

    public UsersRepo(IDataAccess dataAccess)
    {
        _dataAccess = dataAccess;
    }

    public async Task<User?> GetLoggedUser(string? username, string? password)
    {
        User? loggedUser = null;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            return loggedUser;
        } 

        using (var connection = _dataAccess.ReturnConn())
        {
            connection.Open();

            using (SqlCommand getLoggedUserCmd = new SqlCommand("usp_GetLoggedUser", connection))
            {
                getLoggedUserCmd.CommandType = CommandType.StoredProcedure;
                getLoggedUserCmd.Parameters.AddWithValue("@username", username);
                getLoggedUserCmd.Parameters.AddWithValue("@password", password);

                var reader = getLoggedUserCmd.ExecuteReader();

                if (reader.Read())
                {
                    loggedUser = new User
                    {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        Username = reader["username"].ToString()!,
                        Email = reader["email"].ToString()!,
                        Password = "********",
                        IsAdmin = Convert.ToBoolean(reader["is_admin"])
                        
                    };
                }

                reader.Close();
            }
        }

        return loggedUser;
    }

    public void AddNewUser(User userData)
    {
        using (var connection = _dataAccess.ReturnConn())
        {
            connection.Open();

            SqlCommand addNewUSerCmd = new SqlCommand("usp_AddUser", connection);
            addNewUSerCmd.CommandType = CommandType.StoredProcedure;
            addNewUSerCmd.Parameters.AddWithValue("@username", userData.Username);
            addNewUSerCmd.Parameters.AddWithValue("@email", userData.Email);
            addNewUSerCmd.Parameters.AddWithValue("@password", userData.Password);
            addNewUSerCmd.Parameters.AddWithValue("@is_admin", userData.IsAdmin);

            addNewUSerCmd.ExecuteNonQuery();
            connection.Close();
        }
    }

    public async Task<List<object?>> GetAllAdminNames() {
        List<object> adminUsers = [];

        using (var connection = _dataAccess.ReturnConn()) {
            await connection.OpenAsync();

            SqlCommand getAdmins = new SqlCommand("usp_GetAdmins", connection);
            getAdmins.CommandType = CommandType.StoredProcedure;
            var reader = await getAdmins.ExecuteReaderAsync();


            while (reader.Read()) {
                adminUsers.Add(new {
                    username = reader["username"].ToString()!,
                    id = reader["id"].ToString()!,
                });
            }

            await connection.CloseAsync();
        }

        return adminUsers!;
    }

    public async Task<List<object?>> GetAllUserNames()
    {
        List<object> userUsers = [];

        using (var connection = _dataAccess.ReturnConn()) {
            await connection.OpenAsync();

            SqlCommand getAdmins = new SqlCommand("usp_GetUsers", connection);
            getAdmins.CommandType = CommandType.StoredProcedure;
            var reader = await getAdmins.ExecuteReaderAsync();


            while (reader.Read()) {
                userUsers.Add(new {
                    username = reader["username"].ToString()!,
                    id = reader["id"].ToString()!
                });
            }

            await connection.CloseAsync();
        }

        return userUsers!;
    }

    public async Task<UserStatsDTO> GetUserStatsByUserId(Guid userId)
    {
        using (SqlConnection conn = _dataAccess.ReturnConn())
        {
            await conn.OpenAsync();
            
            DynamicParameters spParams = new DynamicParameters();
            spParams.Add("UserId", userId);

            return conn.QuerySingleOrDefault<UserStatsDTO>("usp_GetUserStatsById", spParams, commandType: CommandType.StoredProcedure)!;
        }
    }
}
