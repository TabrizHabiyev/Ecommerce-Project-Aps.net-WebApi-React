using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Domain.Entites.Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace E_Commerce_API.Persistence.Contexts
{
    public class ECommerceAPIDBContext : IdentityDbContext<AppUser>
    {
        public ECommerceAPIDBContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<CategoryBrand> CategoryBrands { get; set; }

        //public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        //{
        //    var datas = ChangeTracker.Entries<BaseEntity>();

        //    foreach (var item in datas)
        //    {
        //        _ = item.State switch
        //        {
        //            EntityState.Added => item.Entity.CreateDate = DateTime.Now,
        //            EntityState.Modified => item.Entity.UpdateDate = DateTime.Now
        //        };
        //    }
        //    return await base.SaveChangesAsync(cancellationToken);
        //}

    }
}
