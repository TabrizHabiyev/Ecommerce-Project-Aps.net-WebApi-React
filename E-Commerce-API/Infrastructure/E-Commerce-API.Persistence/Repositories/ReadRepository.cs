using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites.Common;
using E_Commerce_API.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Persistence.Repositories
{
    public class ReadRepository<T>:IReadRepository<T> where T : BaseEntity
    {
        private readonly ECommerceAPIDBContext _context;
        public ReadRepository(ECommerceAPIDBContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll()
        {
            try
            {
                var query = Table.AsQueryable();
                return query;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method)
        {
            var query = Table.Where(method);
            return query;
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method)
        {
            var query = Table.AsQueryable();
            return await query.FirstOrDefaultAsync(method);
        }


        public async Task<T> GetByIdAsync(string id)
        //=> await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        //=> await Table.FindAsync(Guid.Parse(id));
        {
            var query = Table.AsQueryable();
            return await query.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        }
    }
}
