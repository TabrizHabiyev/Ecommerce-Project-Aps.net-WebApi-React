using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Domain.Entites.Common;
using E_Commerce_API.Domain.Entites.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace E_Commerce_API.Persistence.Contexts
{
    public class ECommerceAPIDBContext : IdentityDbContext<AppUser,Role,Guid>
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
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>()
                 .HasOne(a => a.Address)
                 .WithOne()
                 .HasForeignKey<UserAddress>(a => a.Id)
                 .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                  new Role { Id = Guid.NewGuid(), Name = "Member", NormalizedName = "MEMBER" },
                  new Role { Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
        


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
