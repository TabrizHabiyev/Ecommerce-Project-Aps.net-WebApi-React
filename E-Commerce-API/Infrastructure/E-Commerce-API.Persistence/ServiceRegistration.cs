using E_Commerce_API.Application.AutoMapper;
using E_Commerce_API.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Persistence
{
    public static class ServiceRegistration
    {
        
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddDbContext<ECommerceAPIDBContext>(options => options.UseSqlServer(Configuration.ConnectionString, b => b.MigrationsAssembly(typeof(ECommerceAPIDBContext).Assembly.FullName)));

             services.AddAutoMapper(typeof(AutoMapperProfile));
        }
        
    }
}
