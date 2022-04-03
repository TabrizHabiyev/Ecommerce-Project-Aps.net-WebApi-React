namespace E_Commerce_API.Application.Dto.Order
{
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}