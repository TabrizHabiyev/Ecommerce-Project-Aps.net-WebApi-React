

using E_Commerce_API.Domain.Entites.OrderAggregate;

namespace E_Commerce_API.Application.Dto.Order
{
    public class CreateOrderDto
    {
        public bool SaveAdress { get; set; }
        public ShippingAddress ShippingAdress { get; set; }

    }
}
