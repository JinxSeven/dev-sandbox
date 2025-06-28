namespace TaskTracker.Models
{
    public class Question
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string QuestionText { get; set; }
        public List<Option> Options { get; set; }
    }
}
