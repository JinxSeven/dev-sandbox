using Microsoft.Data.SqlClient;
using TaskTracker.Data;
using TaskTracker.Models;

namespace TaskTracker.Repo
{
    public class ClientRepo
    {
        private readonly IDataAccess _dataAccess;

        public ClientRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<List<object>?> GetAllClientNames()
        {
            List<object> clientList = new List<object>();

            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                var getClientsCmd = new SqlCommand("SELECT client_name, id FROM Clients", connection);
                var reader = await getClientsCmd.ExecuteReaderAsync();


                while (await reader.ReadAsync())
                {
                    clientList.Add(new
                    {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        ClientName = reader["client_name"].ToString()!,
                    });
                }
            }

            return clientList;
        }

        public async Task<List<Client>?> GetAllClients()
        {
            List<Client> clientData = [];
            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();
                SqlCommand getClientsCmd = new SqlCommand("SELECT * FROM Clients", connection);
                var reader = await getClientsCmd.ExecuteReaderAsync();

                while (await reader.ReadAsync()) {
                    clientData.Add(new Client {
                        Id = Guid.Parse(reader["id"].ToString()!),
                        ClientName = reader["client_name"].ToString()!,
                        ContactEmail = reader["contact_mail"].ToString()!,
                        ContactPhone = reader["contact_phone"].ToString()!,
                        CreatedDate = (DateTime)reader["created_date"]
                    });
                }
            }

            return clientData;
        }
    }
}