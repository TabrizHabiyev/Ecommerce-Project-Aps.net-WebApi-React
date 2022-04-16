

namespace E_Commerce_API.Application.Dto.Blog
{
    public class BlogResponseDto
    {
        public string Title { get; set; }
        public Guid ProductId { get; set; }
        public string Details { get; set; }
        public string Description { get; set; }
        public string? Note { get; set; }
        public string ProductName { get; set; }
    }
}
