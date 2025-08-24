namespace BudgetTrackerApp.Server.Models
{
    public class Goal
    {
        public int UserId { get; set; }
        public required string Name { get; set; }
        public double Target { get; set; }
        public double Amount { get; set; }
    }

    public class EditGoal
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Target { get; set; }
    }
}
