using E_Commerce_API.Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.API.Extensions
{
    public static class BasketExtensions
    {


       public static IQueryable<Basket>RetriveBasketWithItems(this IQueryable<Basket> query ,string BuyerId)
        {
            return query.Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .Where(b => b.BuyerId == BuyerId);
        }
    }
}
