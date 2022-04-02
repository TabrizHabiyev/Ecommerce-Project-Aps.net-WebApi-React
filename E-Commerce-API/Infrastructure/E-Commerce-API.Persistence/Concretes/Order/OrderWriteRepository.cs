using E_Commerce_API.Domain.Entites.OrderAggregate;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;

namespace E_Commerce_API.Persistence.Concretes
{
    public class OrderWriteRepository : WriteRepository<Order>, IOrderWriteRepository
    {
        public OrderWriteRepository(ECommerceAPIDBContext context) : base(context) { }
    }
}