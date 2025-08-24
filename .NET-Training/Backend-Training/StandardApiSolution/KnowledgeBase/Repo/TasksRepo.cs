using System.Data;
using Microsoft.Data.SqlClient;

namespace KnowledgeBaseApi.Repo
{
    public class TasksRepo
    {
        private readonly IDataAccess _dataAccess;
        public TasksRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<List<Models.Task>> GetTasks(Guid userId)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getTasksCmd = new SqlCommand("SELECT * FROM Tasks WHERE user_id = @user_id", connection);
                getTasksCmd.Parameters.AddWithValue("@user_id", userId);
                var reader = getTasksCmd.ExecuteReader();

                var userTasks = new List<Models.Task>();
                while (await reader.ReadAsync())
                {
                    userTasks.Add(new Models.Task
                    {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        UserId = Guid.Parse(reader["user_id"].ToString()!),
                        ClientName = reader["client_name"].ToString()!,
                        ProjectName = reader["project_name"].ToString()!,
                        TaskTitle = reader["task_title"].ToString()!,
                        Hours = (decimal)reader["hours"],
                        DateTime = (DateTime)reader["date_time"],
                        AssignedTo = reader["assigned_to"].ToString()!,
                        AssignedBy = reader["assigned_by"].ToString()!,
                        TaskState = reader["task_state"].ToString()!,
                        Priority = reader["priority"].ToString()!,
                        Description = reader["description"].ToString()!,
                    });
                }

                await reader.CloseAsync();
                await connection.CloseAsync();

                return userTasks;
            }
        }

        public async Task<Guid> AddNewTask(Models.Task taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand addNewTaskCmd = new SqlCommand("usp_AddTask", connection);
                addNewTaskCmd.CommandType = CommandType.StoredProcedure;
                addNewTaskCmd.Parameters.AddWithValue("@user_id", taskData.UserId);
                addNewTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                addNewTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                addNewTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                addNewTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                addNewTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                addNewTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                addNewTaskCmd.Parameters.AddWithValue("@task_state", taskData.TaskState);
                addNewTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                addNewTaskCmd.Parameters.AddWithValue("@description", taskData.Description);

                SqlParameter outputIdParam = new SqlParameter("@task_id", SqlDbType.UniqueIdentifier)
                {
                    Direction = ParameterDirection.Output
                };
                addNewTaskCmd.Parameters.Add(outputIdParam);

                await addNewTaskCmd.ExecuteNonQueryAsync();

                Guid newTaskId = (Guid)outputIdParam.Value;

                return newTaskId;
            }
        }

        public void UpdateTaskState(Guid taskId, string taskState)
        {
            using (SqlConnection connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand setStateCmd = new SqlCommand("usp_UpdateTaskState", connection);
                setStateCmd.CommandType = CommandType.StoredProcedure;
                setStateCmd.Parameters.AddWithValue("@id", taskId);
                setStateCmd.Parameters.AddWithValue("@task_state", taskState);
                setStateCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        public void EditTask(Models.Task taskData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand editTaskCmd = new SqlCommand("usp_EditTask", connection);
                editTaskCmd.CommandType = CommandType.StoredProcedure;
                editTaskCmd.Parameters.AddWithValue("@task_id", taskData.Id);
                editTaskCmd.Parameters.AddWithValue("@client_name", taskData.ClientName);
                editTaskCmd.Parameters.AddWithValue("@project_name", taskData.ProjectName);
                editTaskCmd.Parameters.AddWithValue("@task_title", taskData.TaskTitle);
                editTaskCmd.Parameters.AddWithValue("@hours", taskData.Hours);
                editTaskCmd.Parameters.AddWithValue("@date_time", taskData.DateTime);
                editTaskCmd.Parameters.AddWithValue("@assigned_to", taskData.AssignedTo);
                editTaskCmd.Parameters.AddWithValue("@assigned_by", taskData.AssignedBy);
                editTaskCmd.Parameters.AddWithValue("@task_state", taskData.TaskState);
                editTaskCmd.Parameters.AddWithValue("@priority", taskData.Priority);
                editTaskCmd.Parameters.AddWithValue("@description", taskData.Description);
                editTaskCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        public async Task<List<object>?> GetUserTaskStats()
        {
            List<object> userTaskStates = [];

            using (var connection = _dataAccess.ReturnConn()) {
                await connection.OpenAsync();

                var getTaskStates = new SqlCommand("usp_GetUserTaskStats", connection);
                getTaskStates.CommandType = CommandType.StoredProcedure;
                var reader = await getTaskStates.ExecuteReaderAsync();

                while (await reader.ReadAsync()) {
                    userTaskStates.Add(new {
                        username = reader["username"].ToString(),
                        id = reader["user_id"].ToString(),
                        email = reader["email"].ToString(),
                        isAdmin = Convert.ToBoolean(reader["is_admin"]),
                        totalTasks = int.Parse(reader["total_tasks"].ToString()!),
                        newPercentage = double.Parse(reader["new_percentage"].ToString()!),
                        activePercentage = double.Parse(reader["active_percentage"].ToString()!),
                        completePercentage = double.Parse(reader["complete_percentage"].ToString()!)
                    });
                }

                await connection.CloseAsync();
            }

            return userTaskStates;
        }

        public void DeleteTask(Guid taskId)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                var deleteTaskCmd = new SqlCommand("usp_DeleteTask", connection);
                deleteTaskCmd.CommandType = CommandType.StoredProcedure;
                deleteTaskCmd.Parameters.AddWithValue("@task_id", taskId);
                deleteTaskCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }
}
