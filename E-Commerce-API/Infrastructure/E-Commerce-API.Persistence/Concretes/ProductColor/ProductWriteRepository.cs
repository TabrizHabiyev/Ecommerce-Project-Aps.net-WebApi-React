using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;


namespace E_Commerce_API.Persistence.Concretes
{
    public class ProductColorWriteRepository : WriteRepository<ColorProduct>, IProductColorWriteRepository
    {
        public ProductColorWriteRepository(ECommerceAPIDBContext context) : base(context) { }
    }
}
