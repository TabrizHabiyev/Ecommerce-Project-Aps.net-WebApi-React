using AutoMapper;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.AutoMapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserLoginDto, AppUser>().ReverseMap();
            CreateMap<UserRegisterDto,AppUser>().ReverseMap();
            CreateMap<AppUserDto, AppUser>().ReverseMap();
        }
    }
}
