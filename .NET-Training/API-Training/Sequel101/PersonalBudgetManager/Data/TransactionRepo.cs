using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Reflection;

namespace PersonalBudgetManager.Data
{
    public class TransactionRepo : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public TransactionRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<object> GetUserTransactions(int user_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand getUserTransactsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserTransactions(@user_id);", con);
            getUserTransactsCmd.Parameters.AddWithValue("@user_id", user_id);
            SqlDataReader reader = getUserTransactsCmd.ExecuteReader();

            var userTransacts = new List<object>();
            while (reader.Read())
            {
                userTransacts.Add(new
                {
                    UserId = reader["UserId"],
                    TransactionType = reader["Type"],
                    Amount = reader["Amount"],
                    Category = reader["Category"],
                    DateTime = reader["DateTime"],
                    Id = reader["Id"]
                });
            }
            reader.CloseAsync();
            con.CloseAsync();

            return userTransacts;
        }

        public void AddUserTransaction(Transaction transact)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand addUserTransactCmd = new SqlCommand("addTransactionProcedure", con);
            addUserTransactCmd.CommandType = System.Data.CommandType.StoredProcedure;
            addUserTransactCmd.Parameters.AddWithValue("@user_id", transact.UserId);
            addUserTransactCmd.Parameters.AddWithValue("@type", transact.TransactionType);
            addUserTransactCmd.Parameters.AddWithValue("@amount", transact.Amount);
            addUserTransactCmd.Parameters.AddWithValue("@category", transact.Category);
            addUserTransactCmd.Parameters.AddWithValue("@date_and_time", transact.DateTime);
            addUserTransactCmd.ExecuteNonQuery();
        }

        public void EditUserTransaction(EditTransaction transact)
        {   
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand editTransactDataCmd = new SqlCommand("editTransactDataProcedure", con);
            editTransactDataCmd.CommandType = System.Data.CommandType.StoredProcedure;
            editTransactDataCmd.Parameters.AddWithValue("@transact_id", transact.Id);
            editTransactDataCmd.Parameters.AddWithValue("@type", transact.TransactionType);
            editTransactDataCmd.Parameters.AddWithValue("@amount", transact.Amount);
            editTransactDataCmd.Parameters.AddWithValue("@category", transact.Category);
            editTransactDataCmd.Parameters.AddWithValue("@date_and_time", transact.DateTime);
            editTransactDataCmd.ExecuteNonQuery();
        }

        public void DeleteTransaction(int transact_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand delTransactCmd = new SqlCommand("deleteTransactionProcedure", con);
            delTransactCmd.CommandType = System.Data.CommandType.StoredProcedure;
            delTransactCmd.Parameters.AddWithValue("@transact_id", transact_id);
            delTransactCmd.ExecuteNonQuery();
        }
    }
}
