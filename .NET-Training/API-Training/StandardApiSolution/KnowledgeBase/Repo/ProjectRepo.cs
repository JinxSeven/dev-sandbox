using System.Data;
using Microsoft.Data.SqlClient;
using TaskTracker.Models;

namespace TaskTracker.Data
{
    public class ProjectRepo
    {
        private readonly IDataAccess _dataAccess;
        public ProjectRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<List<object>?> GetProjectListByClientId(Guid clientId)
        {
            List<object> projectsByClient = [];
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getProjectsCmd = new SqlCommand("SELECT id, project_name FROM Projects WHERE client_id = @client_id", connection);
                getProjectsCmd.Parameters.AddWithValue("@client_id", clientId);
                var reader = await getProjectsCmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    projectsByClient.Add(new
                    {
                        id = Guid.Parse(reader["id"].ToString()!),
                        projectName = reader["project_name"].ToString()!
                    });
                }
            }

            return projectsByClient;
        }

        public async Task<List<Project>?> GetProjectsByClientId(Guid clientId)
        {
            var projectsByClient = new List<Project>();
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getProjectByClientIdCmd = new SqlCommand("SELECT * FROM Projects WHERE client_id = @client_id", connection);
                getProjectByClientIdCmd.Parameters.AddWithValue("@client_id", clientId);
                var reader = await getProjectByClientIdCmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    // Retrieve column indices for efficiency
                    int idIndex = reader.GetOrdinal("id");
                    int projectNameIndex = reader.GetOrdinal("project_name");
                    int descriptionIndex = reader.GetOrdinal("description");
                    int startDateIndex = reader.GetOrdinal("start_date");
                    int endDateIndex = reader.GetOrdinal("end_date");
                    int clientIdIndex = reader.GetOrdinal("client_id");

                    // Map the database values to the Project object
                    projectsByClient.Add(new Project
                    {
                        Id = Guid.Parse(reader[idIndex].ToString()!), // Parse GUID
                        ProjectName = reader[projectNameIndex].ToString()!, // Required field
                        Description = reader.IsDBNull(descriptionIndex) ? null : reader[descriptionIndex].ToString()!, // Nullable
                        StartDate = reader.GetDateTime(startDateIndex), // Non-nullable DateTime
                        EndDate = reader.IsDBNull(endDateIndex) ? (DateTime?)null : reader.GetDateTime(endDateIndex), // Nullable DateTime
                        ClientId = Guid.Parse(reader[clientIdIndex].ToString()!) // Parse GUID
                    });
                }
            }

            return projectsByClient;
        }
    }
}