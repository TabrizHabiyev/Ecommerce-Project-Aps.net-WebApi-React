using E_Commerce_API.Application.AutoMapper;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Text;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Http;

namespace E_Commerce_API.Persistence
{
    public static class ServiceRegistration
    {
        
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            #region Connection String
            services.AddDbContext<ECommerceAPIDBContext>(options => options.UseSqlServer(Configuration.ConnectionString, b => b.MigrationsAssembly(typeof(ECommerceAPIDBContext).Assembly.FullName)));
            #endregion


            #region Automapper
            services.AddAutoMapper(typeof(AutoMapperProfile));
            #endregion


            #region JWT 
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("myksssssssssssss3333ey")),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Dependency Injection Jwt service
            services.AddScoped<ITokenServiceRepository, TokenServiceRepository>();
            #endregion

            services.AddIdentityCore<AppUser>(opt => {
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ECommerceAPIDBContext>();

        }

    }
}
