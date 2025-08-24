using BudgetTrackerApp.Server.Data;
using BudgetTrackerApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Reflection;

namespace PersonalBudgetManager.Data
{
    public class GoalRepo
    {
        private readonly IDataAccess _dataAccess;
        public GoalRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<object> GetUserGoals(int user_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();

            SqlCommand getUserGoalsCmd = new SqlCommand("SELECT * FROM dbo.fnGetUserGoals(@user_id);", con);
            getUserGoalsCmd.Parameters.AddWithValue("@user_id", user_id);
            SqlDataReader reader = getUserGoalsCmd.ExecuteReader();

            var userGoals = new List<object>();
            while (reader.Read())
            {
                userGoals.Add(new
                {
                    UserId = reader["UserId"],
                    Name = reader["Name"],
                    Target = reader["Target"],
                    Amount = reader["Amount"],
                    Id = reader["Id"]
                });
            }
            reader.Close();
            con.Close();

            return userGoals;
        }

        public void AddUserGoal(Goal goal)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand addUserGoalCmd = new SqlCommand("addGoalProcedure", con);
            addUserGoalCmd.CommandType = System.Data.CommandType.StoredProcedure;
            addUserGoalCmd.Parameters.AddWithValue("@user_id", goal.UserId);
            addUserGoalCmd.Parameters.AddWithValue("@name", goal.Name);
            addUserGoalCmd.Parameters.AddWithValue("@target", goal.Target);
            addUserGoalCmd.Parameters.AddWithValue("@amount", goal.Amount);
            addUserGoalCmd.ExecuteNonQuery();
        }

        public void EditGoalData(int goal_id, string name, double target)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand editGoalDataCmd = new SqlCommand("editGoalDataProcedure", con);
            editGoalDataCmd.CommandType = System.Data.CommandType.StoredProcedure;
            editGoalDataCmd.Parameters.AddWithValue("@goal_id", goal_id);
            editGoalDataCmd.Parameters.AddWithValue("@name", name);
            editGoalDataCmd.Parameters.AddWithValue("@target", target);
            editGoalDataCmd.ExecuteNonQuery();
        }

        public void ContributGoalAmount(int goal_id, double contribution)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand contributeGoalCmd = new SqlCommand("addGoalContributionProcedure", con);
            contributeGoalCmd.CommandType = System.Data.CommandType.StoredProcedure;
            contributeGoalCmd.Parameters.AddWithValue("@goal_id", goal_id);
            contributeGoalCmd.Parameters.AddWithValue("@amount_to_add", contribution);
            contributeGoalCmd.ExecuteNonQuery();
        }

        public void DeleteGoal(int goal_id)
        {
            SqlConnection con = _dataAccess.Conn();
            con.Open();
            SqlCommand deleteGoalCmd = new SqlCommand("deleteGoalProcedure", con);
            deleteGoalCmd.CommandType = System.Data.CommandType.StoredProcedure;
            deleteGoalCmd.Parameters.AddWithValue("@goal_id", goal_id);
            deleteGoalCmd.ExecuteNonQuery();
        }
    }
}
