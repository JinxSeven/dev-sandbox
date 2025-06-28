using Microsoft.Data.SqlClient;

namespace BudgetTrackerApp.Server.Data
{
    public interface IDataAccess
    {
        SqlConnection Conn();
    }

    public class DataAccess: IDataAccess
    {
        SqlConnection conn;

        public DataAccess(string? connStr)
        {
            this.conn = new SqlConnection(connStr);
        }

        public SqlConnection Conn()
        {
            return conn;
        }
    }
}
