using DT.Catalog.Service.Entities;
using Microsoft.Data.SqlClient;

namespace DT.Catalog.Service.Repos
{
    public class UsersRepo
    {
        private readonly IDataAccess _dataAccess;

        public UsersRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public Object? PostUser(PostUser user)
        {
            Object? res;
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                using (var postUserCmd = new SqlCommand("usp_InsertNewUser", connection))
                {
                    postUserCmd.CommandType = System.Data.CommandType.StoredProcedure;

                    postUserCmd.Parameters.AddWithValue("@UserName", user.UserName);
                    postUserCmd.Parameters.AddWithValue("@UserEmail", user.UserEmail);
                    postUserCmd.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                    postUserCmd.Parameters.AddWithValue("@UserRole", user.UserRole);

                    res = postUserCmd.ExecuteScalar();
                }
            }

            return res;
        }
    }
}
