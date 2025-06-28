namespace TaskTracker.Models
{
    public class Presentation
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FileName { get; set; }
        public byte[] FileData { get; set; } // Use byte[] for binary data
    }
}
