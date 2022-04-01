namespace E_Commerce_API.Application.Dto.Basket
{
    public class BasketItemDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string PictureUrl { get; set; }
        public string Category { get; set; }
        public string Type  { get; set; }
        public int Quantity { get; set; }
    }
}