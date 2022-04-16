
using Microsoft.AspNetCore.Http;

namespace E_Commerce_API.Application.Dto.CategoryDto
{
    public class CategoryDto
    {
        public string Name { get; set; }
        public bool IsMain { get; set; }
        public bool IsFatured { get; set; }
        public Guid? MainCategoryId { get; set;}
        public IFormFile? file { get; set; }
    }
}
