using E_Commerce_API.Domain.Entites.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce_API.Domain.Entites
{
    [Table("BasketItem")]
    public class BasketItem:BaseEntity
    {
        
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid BasketId  { get; set; }
        public Basket Basket { get; set; }
    }
}