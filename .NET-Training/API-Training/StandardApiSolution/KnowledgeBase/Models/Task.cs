namespace KnowledgeBaseApi.Models
{
    public class Task
    {
        public Guid? Id { get; set; }
        public Guid UserId { get; set; }
        public required string ClientName { get; set; }
        public required string ProjectName { get; set; }
        public required string TaskTitle { get; set; }
        public decimal Hours { get; set; }
        public DateTime DateTime { get; set; }
        public required string AssignedTo { get; set; }
        public required string AssignedBy { get; set; }
        public required string TaskState { get; set; }
        public required string Priority { get; set; }
        public required string Description { get; set; }
    }
}
