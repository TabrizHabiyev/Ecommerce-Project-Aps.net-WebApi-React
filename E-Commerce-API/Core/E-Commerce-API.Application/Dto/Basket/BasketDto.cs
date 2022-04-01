

using E_Commerce_API.Domain.Entites;

namespace E_Commerce_API.Application.Dto.Basket
{
    public class BasketDto
    {
        public Guid Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; } = new();
    }
}
