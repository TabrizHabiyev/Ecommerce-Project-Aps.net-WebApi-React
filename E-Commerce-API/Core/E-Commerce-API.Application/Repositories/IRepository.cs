using E_Commerce_API.Domain.Entites.Common;
using Microsoft.EntityFrameworkCore;


namespace E_Commerce_API.Application.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
