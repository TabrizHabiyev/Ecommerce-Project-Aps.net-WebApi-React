
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.Domain.Entites.OrderAggregate
{
    [Owned]
    public class ProductItemOrdered
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}
