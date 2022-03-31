using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace E_Commerce_API.Persistence.Repositories
{
    public class TokenServiceRepository : ITokenServiceRepository
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;

        public TokenServiceRepository(UserManager<AppUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }
        public async Task<string> GenerateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
              new Claim (ClaimTypes.Email,user.Email),
              new Claim(ClaimTypes.Sid, user.Id)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("myksssssssssssss3333ey"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenOption = new JwtSecurityToken
            (
              issuer: null,
              audience: null,
              claims: claims,
              expires: DateTime.Now.AddDays(7),
              signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenOption);
        }

    }
}
