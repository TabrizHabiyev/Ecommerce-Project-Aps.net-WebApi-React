using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Repositories
{
    public interface ITokenServiceRepository
    {
        public  Task<string> GenerateToken(AppUser user);
    }
}
