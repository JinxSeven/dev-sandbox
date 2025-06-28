namespace TaskTracker.Models
{
    public class Compliance
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public double RequiredPercentage { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public Presentation Presentation { get; set; }
        
        public List<Question> Questions { get; set; }
    }
}
