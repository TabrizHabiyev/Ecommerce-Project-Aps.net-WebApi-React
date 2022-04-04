using E_Commerce_API.Domain.Entites.Common;

namespace E_Commerce_API.Domain.Entites
{
    public class Basket:BaseEntity
    {
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        public void AddItem(Product product,int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem {Product = product,Quantity= quantity});
            }
            var exsistingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (exsistingItem != null) exsistingItem.Quantity += quantity;
        }

        public void RemoveItem(Guid productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}
