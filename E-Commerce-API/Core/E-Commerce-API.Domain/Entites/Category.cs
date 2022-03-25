using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class Category:BaseEntity
    {
        public string Name { get; set; }
        public bool IsMain { get; set; }
        public bool IsFatured { get; set; }
        public string? ImageUrl { get; set; }
        public List<Category> SubCategory { get; set; }
        public Category? MainCategory { get; set; }
        public Guid? MainCategoryId { get; set;}
        public bool IsDeleted { get; set; }
        public List<CategoryBrand> categoryBrands { get; set; }
    }
}
