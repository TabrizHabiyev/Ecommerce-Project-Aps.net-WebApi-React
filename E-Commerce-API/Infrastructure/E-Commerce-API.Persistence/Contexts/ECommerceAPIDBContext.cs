using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Persistence.Contexts
{
    public class ECommerceAPIDBContext : IdentityDbContext<AppUser>
    {
        public ECommerceAPIDBContext(DbContextOptions options) : base(options)
        { }

    }
}
