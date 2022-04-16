

namespace E_Commerce_API.Application.Dto.CategoryDto
{
    public class CategoryResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsMain { get; set; }
        public bool IsFatured { get; set; }
        public string? ImageUrl { get; set; }
        public Guid? MainCategoryId { get; set; }

    }
}
