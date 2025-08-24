using System.ComponentModel.DataAnnotations;
namespace DT.Catalog.Service.Entities
{
    public class Game
    {
        public Guid GameId { get; set; }
        public required string GameName { get; set; }
        public required string GameCategory { get; set; }
        public required string GameDescription { get; set; }
        public required decimal GamePrice { get; set; }
        public DateTimeOffset GameCreatedDate { get; set; }
    }

    public class PostGame
    {
        public required string GameName { get; set; }
        public required string GameCategory { get; set; }
        public required string GameDescription { get; set; }
        [Required]
        [Range(0, 499.99)]
        public decimal GamePrice { get; set; }
    }
}
