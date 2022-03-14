using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Persistence.Contexts
{
    public class ECommerceAPIDBContext : DbContext
    {
        public ECommerceAPIDBContext(DbContextOptions options) : base(options)
        { }
    }
}
