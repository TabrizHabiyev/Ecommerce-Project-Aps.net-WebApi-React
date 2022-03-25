using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);

        Task<bool> AddRangeAsync(List<T> datas);

        bool Remove(T model);

        Task<bool> RemoveAsync(string id);

        bool RemoveRange(List<T> datas);

        bool Update(T model);

        Task<int> SaveAsync();
    }
}
