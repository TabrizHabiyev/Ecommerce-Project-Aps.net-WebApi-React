using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Dto.ProductDto
{
    public class ProductDto
    {
        [Required, MinLength(5)]
        public string name { get; set; }
        [Required, MinLength(55)]
        public string Description { get; set; }
        public string Type { get; set; }
        [Required]
        public double Price { get; set; }
        public bool inStock { get; set; } 
        [Required]
        public int Quantity { get; set; }
        public bool Featured { get; set; }
        public Guid CategoryId { get; set; }
        public Guid? CampaignId { get; set; }
        public DateTime? CompaignExpiryDate { get; set; }

        [Required]
        public IFormFile[] file { get; set; }
        // Product relation field
        [Required]
        public  string[] tagList { get; set; }
        public string[] colorId { get; set; }
    }
}
