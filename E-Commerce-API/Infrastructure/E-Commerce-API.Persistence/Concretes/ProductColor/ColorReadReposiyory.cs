using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;


namespace E_Commerce_API.Persistence.Concretes.ProductColor
{
    public class ColorReadRepository : ReadRepository<Color>, IColorReadRepository
    {
        public ColorReadRepository(ECommerceAPIDBContext context) : base(context) { }
    }
}
