using Microsoft.Data.SqlClient;

namespace TaskTracker.Data
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
            this.conn = new SqlConnection(connStr);
        }

        public SqlConnection ReturnConn()
        {
            return conn;
        }
    }
}
