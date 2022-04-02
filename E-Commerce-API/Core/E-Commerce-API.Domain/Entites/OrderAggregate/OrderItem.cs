

namespace E_Commerce_API.Domain.Entites.OrderAggregate
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }

    }
}
