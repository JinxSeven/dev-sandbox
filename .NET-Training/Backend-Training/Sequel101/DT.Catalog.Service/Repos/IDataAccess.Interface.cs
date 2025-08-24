using Microsoft.Data.SqlClient;

namespace DT.Catalog.Service.Repos
{
    public interface IDataAccess
    {
        SqlConnection ReturnConn();
    }

    public class DataAccess : IDataAccess
    {
        private SqlConnection _dbConn;

        public DataAccess(SqlConnection dbConn)
        {
            this._dbConn = dbConn;
        }

        public SqlConnection ReturnConn()
        {
            return _dbConn;
        }
    }
}
