using E_Commerce_API.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Dto.ProductDto
{
    public class ProductResponseDto
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public double Price { get; set; }
        public bool inStock { get; set; }
        public int Quantity { get; set; }
        public bool Featured { get; set; }
        public Guid CategoryId { get; set; }
        public Guid? CampaignId { get; set; }
        public DateTime? CompaignExpiryDate { get; set; }
        public List<ProductPhoto> photoUrl { get; set; } = new List<ProductPhoto>();
        public List<string> tagList { get; set; } = new List<string>();
        public List<Color> colorList { get; set; } = new List<Color>();
    }
}
