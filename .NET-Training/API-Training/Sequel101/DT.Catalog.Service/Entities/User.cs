using System.ComponentModel.DataAnnotations;
using System.Security;

namespace DT.Catalog.Service.Entities
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string UserName { get; set; }
        public required string UserEmail { get; set; }
        public required string UserPassword { get; set; }
        public required string UserRole { get; set; }
    }

    public class PostUser
    {
        public required string UserName { get; set; }
        [StringLength(50, MinimumLength = 5)]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")]
        public required string UserEmail { get; set; }
        public required string UserPassword { get; set; }
        [RegularExpression(@"^(?i)(creator|customer)$")]
        public required string UserRole { get; set; }
    }
}
