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
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductPhoto> ProductPhotos { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ColorProduct> ColorsProducts { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ProductTag> ProductTags { get; set;}




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
