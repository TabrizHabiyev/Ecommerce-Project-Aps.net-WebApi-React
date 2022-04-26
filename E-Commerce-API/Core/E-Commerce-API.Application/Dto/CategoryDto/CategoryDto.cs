using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Dto.CategoryDto
{
    public class CategoryDto
    {
        public string Name { get; set; }
        public bool IsMain { get; set; }
        public bool IsFatured { get; set; }
        public string? MainCategoryId { get; set; }
        public IFormFile? file { get; set; }
    }
}
