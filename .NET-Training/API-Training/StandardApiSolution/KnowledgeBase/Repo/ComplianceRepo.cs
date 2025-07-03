using Dapper;
using KnowledgeBaseApi.Models;
using KnowledgeBaseApi.Models.DTOs;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace KnowledgeBaseApi.Repo
{
    public class ComplianceRepo
    {
        private readonly IDataAccess _dataAccess;

        public ComplianceRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async System.Threading.Tasks.Task AddNewComplianceAsync(Compliance compliance)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();
                using (SqlCommand cmd = new SqlCommand("usp_AddCompliance", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Compliance Details
                    cmd.Parameters.AddWithValue("@comp_name", compliance.Title);
                    cmd.Parameters.AddWithValue("@comp_description", compliance.Description);
                    cmd.Parameters.AddWithValue("@req_percentage", compliance.RequiredPercentage);
                    cmd.Parameters.AddWithValue("@created_by", compliance.CreatedBy); // Change as needed

                    // Presentation Details (Check if file exists)
                    if (compliance.Presentation != null)
                    {
                        cmd.Parameters.AddWithValue("@file_name", compliance.Presentation.FileName);
                        if (compliance.Presentation.FileData != null)
                        {
                            cmd.Parameters.Add("@file_data", SqlDbType.VarBinary, -1).Value = compliance.Presentation.FileData;
                        }
                        else
                        {
                            cmd.Parameters.Add("@file_data", SqlDbType.VarBinary, -1).Value = DBNull.Value;
                        }
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@file_name", DBNull.Value);
                        cmd.Parameters.AddWithValue("@file_data", DBNull.Value);
                    }

                    // Convert Questions List to JSON
                    string jsonQuestions = JsonConvert.SerializeObject(compliance.Questions);

                    Console.WriteLine(jsonQuestions);

                    cmd.Parameters.AddWithValue("@questions", jsonQuestions);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<List<ComplianceDTO>?> GetComplianceDetails()
        {
            List<ComplianceDTO> compsList = new List<ComplianceDTO>();

            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getCompliance = new SqlCommand("usp_GetComplianceDetails", connection);
                SqlDataReader Reader = await getCompliance.ExecuteReaderAsync();

                while (await Reader.ReadAsync())
                {
                    decimal requiredPercentage = (decimal)Reader["req_percentage"]!;

                    compsList.Add(new ComplianceDTO
                    {
                        Id = Guid.Parse(Reader["id"].ToString()!),
                        Title = Reader["comp_name"].ToString()!,
                        Description = Reader["comp_description"].ToString()!,
                        RequiredPercentage = (double)requiredPercentage,
                        CreatedBy = Reader["created_by"].ToString()!,
                        CreatedDate = (DateTime)Reader["created_date"]!,
                        QuestionsCount = Convert.ToInt32(Reader["quest_count"].ToString()!)
                    });
                }
            }

            return compsList;
        }

        public async Task<int> AssignCompliance(Guid userId, Guid compId)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();
                SqlCommand checkCmd = new("usp_IsComplianceAlreadyAssigned", conn);

                checkCmd.CommandType = CommandType.StoredProcedure;

                checkCmd.Parameters.AddWithValue("@user_id", userId);
                checkCmd.Parameters.AddWithValue("@comp_id", compId);

                int res = (int)checkCmd.ExecuteScalar();

                if (res == 1) return -1;

                SqlCommand assignCmd = new
                    (
                    "INSERT INTO UserCompliances (user_id, comp_id) VALUES (@user_id, @comp_id)", conn
                    );
                assignCmd.Parameters.AddWithValue("@user_id", userId);
                assignCmd.Parameters.AddWithValue("@comp_id", compId);

                return await assignCmd.ExecuteNonQueryAsync();
            }
        }

        public async Task<List<AssignedComplianceDTO>?> GetAssignedCompliancesById(Guid userId)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();

                DynamicParameters assignedCompsParams = new DynamicParameters();
                assignedCompsParams.Add("UserId", userId);

                var result = await conn.QueryAsync<AssignedComplianceDTO>("usp_GetAssignedCompliancesById", assignedCompsParams, commandType: CommandType.StoredProcedure)!;

                return result.ToList();
            }
        }

        public async Task<Presentation?> GetPptByComplianceId(Guid compId)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();

                DynamicParameters compParams = new DynamicParameters();
                compParams.Add("CompId", compId);

                return await conn.QueryFirstOrDefaultAsync<Presentation>("usp_GetPptByComplianceId", compParams, commandType: CommandType.StoredProcedure)!;
            }
        }

        public async Task<List<Question>> GetQuestionsByCompliancesId(Guid compId)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();

                DynamicParameters compParams = new DynamicParameters();
                compParams.Add("CompId", compId);

                Dictionary<Guid, Question> questDict = [];

                var result = await conn.QueryAsync<Question, Option, Question>("usp_GetQuestionsByCompliancesId",
                (question, option) =>
                {
                    if (!questDict.TryGetValue(question.Id, out var existingQuestion))
                    {
                        existingQuestion = question;
                        existingQuestion.Options = new List<Option>();
                        questDict.Add(question.Id, existingQuestion);
                    }

                    if (option != null && option.Id != Guid.Empty)
                    {
                        existingQuestion.Options.Add(option);
                    }

                    return existingQuestion;
                },
                compParams, commandType: CommandType.StoredProcedure, splitOn: "OptionId")!;

                return result.Distinct().ToList();
            }
        }
    }
}
