namespace BudgetTrackerApp.Server.Models
{
    public class User
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class LoginCred
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
