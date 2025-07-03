namespace KnowledgeBaseApi.Models.DTOs
{
    public class AssignedComplianceDTO
    {
        public Guid Id { get; set; }
        public string ComplianceName { get; set; }
        public string ComplianceDescription { get; set; }
        public decimal RequiredPercentage { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int QuestionCount { get; set; }
        public DateTime? AssignedDate { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? CompletedDate { get; set; }
        public decimal? ComplianceScore { get; set; }
    }
}