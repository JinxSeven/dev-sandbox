using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Reflection;

namespace PersonalBudgetManager.Data
{
    public class UserRepo: ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public UserRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<object> GetUserDetails(int user_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();

            SqlCommand getUserDetailsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserDetails(@user_id);", con);
            getUserDetailsCmd.Parameters.AddWithValue("@user_id", user_id);
            SqlDataReader reader = getUserDetailsCmd.ExecuteReader();

            var userDetails = new List<object>();
            while (reader.Read())
            {
                userDetails.Add(new
                {
                    Name = reader["Name"],
                    Email = reader["Email"],
                    Income = reader["Income"],
                    Expense = reader["Expense"],
                    Balance = reader["Balance"],
                    TransactionCount = reader["TransactionCount"],
                    GoalCount = reader["GoalCount"]
                });
            }
            reader.Close();
            con.Close();

            return userDetails;
        }

        public int? ValidateUser(LoginCred loginCred)
        {
            using (var con = _dataAccess.Conn())
            {
                con.Open();
                var loginCmd = new SqlCommand("SELECT Id FROM Users " +
                    "WHERE Email = @email " +
                    "AND Password = @password", con);
                loginCmd.Parameters.AddWithValue("@email", loginCred.Email);
                loginCmd.Parameters.AddWithValue("@password", loginCred.Password);

                var result = loginCmd.ExecuteScalar();

                if (result != null)
                {
                    return (int)result;
                }
            }

            return null;
        }


        public void AddUser(User user)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand addUserCmd = new SqlCommand("addUserProcedure", con);
            addUserCmd.CommandType = System.Data.CommandType.StoredProcedure;
            addUserCmd.Parameters.AddWithValue("@name", user.Name);
            addUserCmd.Parameters.AddWithValue("@email", user.Email);
            addUserCmd.Parameters.AddWithValue("@password", user.Password);
            addUserCmd.ExecuteNonQuery();
        }

        public void EditUser(int user_id, string name, string email)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand editUserCmd = new SqlCommand("editUserDataProcedure", con);
            editUserCmd.CommandType = System.Data.CommandType.StoredProcedure;
            editUserCmd.Parameters.AddWithValue("@id", user_id);
            editUserCmd.Parameters.AddWithValue("@name", name);
            editUserCmd.Parameters.AddWithValue("@email", email);
            editUserCmd.ExecuteNonQuery();
        }

        public void ChangeUserPassword(int user_id, string oldpass, string newpass)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand changePassCmd = new SqlCommand("changeUserPassProcedure", con);
            changePassCmd.CommandType = System.Data.CommandType.StoredProcedure;
            changePassCmd.Parameters.AddWithValue("@id", user_id);
            changePassCmd.Parameters.AddWithValue("@oldpass", oldpass);
            changePassCmd.Parameters.AddWithValue("@newpass", newpass);
            changePassCmd.ExecuteNonQuery();
        }

        public void DeleteUser(int user_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand deleteUserCmd = new SqlCommand("deleteUserProcedure", con);
            deleteUserCmd.CommandType = System.Data.CommandType.StoredProcedure;
            deleteUserCmd.Parameters.AddWithValue("@id", user_id);
            deleteUserCmd.ExecuteNonQuery();
        }
    }
}
