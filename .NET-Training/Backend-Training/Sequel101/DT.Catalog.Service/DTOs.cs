using System.ComponentModel.DataAnnotations;

namespace DT.Catalog.Service.DTOs
{
    public record ItemDTO
        (
            Guid Id,
            string Name,
            string Description,
            decimal Price,
            DateTimeOffset DateCreated
        );

    public record CreateItemDTO
        (
            [Required] string Name,
            string Description,
            [Range(0, 99999)] decimal Price
        );

    public record UpdateItemDTO
        (
            [Required] string Name,
            string Description,
            [Range(0, 99999)] decimal Price
        );
}
