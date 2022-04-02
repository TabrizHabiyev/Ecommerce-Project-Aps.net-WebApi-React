using E_Commerce_API.Domain.Entites.OrderAggregate;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;

namespace E_Commerce_API.Persistence.Concretes
{
    public class OrderReadRepository : ReadRepository<Order>, IOrderReadRepository
    {
        public OrderReadRepository(ECommerceAPIDBContext context) : base(context) { }
    }
}
