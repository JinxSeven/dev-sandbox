namespace TodoApp.Models
{
    public class TodoList
    {
        public int Id { get; set; }
        public required string TaskTitle { get; set; }
        public required string TaskCategory { get; set; }
        public bool TaskStatus { get; set; }

        public TodoList() { }
    }
}
