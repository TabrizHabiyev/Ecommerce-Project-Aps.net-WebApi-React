
using E_Commerce_API.Domain.Entites.Common;

namespace E_Commerce_API.Domain.Entites.OrderAggregate
{
    public class Order:BaseEntity
    {
        public Guid BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public double SubTotal { get; set; }
        public double Discount { get; set; }
        public double Cupon { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Panding;
        public string PaymentIntentId { get; set; }
        public double GetTotal()
        {
            return SubTotal - Discount - Cupon;
        }
    }
}
