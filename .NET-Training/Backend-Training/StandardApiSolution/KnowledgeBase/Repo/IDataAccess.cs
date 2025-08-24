using Microsoft.Data.SqlClient;

namespace KnowledgeBaseApi.Repo
{
    public interface IDataAccess
    {
        SqlConnection ReturnConn();
    }

    public class DataAccess : IDataAccess
    {
        SqlConnection conn;

        public DataAccess(string? connStr)
        {
            conn = new SqlConnection(connStr);
        }

        public SqlConnection ReturnConn()
        {
            return conn;
        }
    }
}
