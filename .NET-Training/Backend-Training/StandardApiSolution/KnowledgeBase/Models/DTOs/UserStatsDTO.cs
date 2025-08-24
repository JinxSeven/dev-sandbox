namespace KnowledgeBaseApi.Models.DTOs
{
    public class UserStatsDTO
    {
        public int TotalTasks { get; set; }
        public decimal NewTasksPercentage { get; set; }
        public decimal ActiveTasksPercentage { get; set; }
        public decimal CompletedTasksPercentage { get; set; }
        public int TotalCompliances { get; set; }
        public int CompletedCompliances { get; set; }
        public decimal TotalHoursLogged { get; set; }
        public decimal TotalHoursWorkedForWeek { get; set; }
        public decimal TotalHoursWorkedForDay { get; set; }
    }
}
