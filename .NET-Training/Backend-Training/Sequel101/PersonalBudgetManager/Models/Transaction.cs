namespace BudgetTrackerApp.Server.Models
{
    public class Transaction
    {
        public int UserId { get; set; }
        public required string TransactionType { get; set; }
        public double Amount { get; set; }
        public required string Category { get; set; }
        public required string DateTime { get; set; }
    }
    public class EditTransaction
    {
        public int Id { get; set; }
        public required string TransactionType { get; set; }
        public double Amount { get; set; }
        public required string Category { get; set; }
        public required string DateTime { get; set; }
    }
}
