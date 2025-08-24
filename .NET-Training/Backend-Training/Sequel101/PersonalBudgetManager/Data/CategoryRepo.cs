using BudgetTrackerApp.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace PersonalBudgetManager.Data
{
    public class CategoryRepo : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public CategoryRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public dynamic GetCategories(int user_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();

            SqlCommand getUserCategsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserCategories(@user_id);", con);
            getUserCategsCmd.Parameters.AddWithValue("@user_id", user_id);
            SqlDataReader reader = getUserCategsCmd.ExecuteReader();

            var userIncCategs = new List<object>();
            var userExpCategs = new List<object>();
            while (reader.Read())
            {
                if (reader["type"].ToString() == "income")
                {
                    userIncCategs.Add(new
                    {
                        Id = reader["Id"],
                        UserId = reader["UserId"],
                        TransactionType = reader["Type"],
                        IncomeCateg = reader["Category"]
                    });
                }
                else
                {
                    userExpCategs.Add(new
                    {
                        Id = reader["Id"],
                        UserId = reader["UserId"],
                        TransactionType = reader["Type"],
                        IncomeCateg = reader["Category"]
                    });
                }
            }

            reader.Close();
            con.Close();

            var result = new
            {
                UserIncomeCategories = userIncCategs,
                UserExpenseCategories = userExpCategs
            };

            return result;
        }

        public void AddCateg(int user_id, string transactionType, string category)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand addCategCmd = new SqlCommand("addCategoryProcedure", con);
            addCategCmd.CommandType = System.Data.CommandType.StoredProcedure;
            addCategCmd.Parameters.AddWithValue("@user_id", user_id);
            addCategCmd.Parameters.AddWithValue("@inc_or_exp", transactionType);
            addCategCmd.Parameters.AddWithValue("@category", category);
            addCategCmd.ExecuteNonQuery();
        }

        public void DeleteCategory(int id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand delCategCmd = new SqlCommand("deleteCategoryProcedure", con);
            delCategCmd.CommandType = System.Data.CommandType.StoredProcedure;
            delCategCmd.Parameters.AddWithValue("@id", id);
            delCategCmd.ExecuteNonQuery();
        }
    }
}
