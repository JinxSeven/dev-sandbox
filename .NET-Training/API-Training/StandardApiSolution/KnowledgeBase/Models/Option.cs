namespace TaskTracker.Models
{
    public class Option
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
}
