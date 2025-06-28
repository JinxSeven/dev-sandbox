namespace TaskTracker.Models
{
    public class Activity
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public required string ActivityTitle { get; set; }
        public required string Description { get; set; }
        public decimal Hours { get; set; }
    }
}
