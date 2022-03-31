using E_Commerce_API.Domain.Entites.Common;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce_API.Domain.Entites
{
    public class Product:BaseEntity
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
        public Guid CampaignId { get; set; }
        public Campaign Campaign { get; set; }
        public List<ColorProduct> ColorProducts { get; set; }
        public List<ProductPhoto> productPhotos { get; set; }
        public List<ProductTag> ProductTags { get; set; }
    }
}