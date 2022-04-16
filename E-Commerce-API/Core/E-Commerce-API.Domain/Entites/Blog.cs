

using E_Commerce_API.Domain.Entites.Common;

namespace E_Commerce_API.Domain.Entites
{
    public class Blog:BaseEntity
    {
        public string Title { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public string Details { get; set; }
        public string Description { get; set; }
        public string? ProductName { get; set; }
        public string? Note { get; set; }
        public string? ImageUrl { get; set; }
        public string? PublicId { get; set; }


    }
}
