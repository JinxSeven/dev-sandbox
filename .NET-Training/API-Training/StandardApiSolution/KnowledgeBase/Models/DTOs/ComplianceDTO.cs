namespace KnowledgeBaseApi.Models.DTOs
{
    public class ComplianceDTO
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public double RequiredPercentage { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int QuestionsCount { get; set; }
    }
}
