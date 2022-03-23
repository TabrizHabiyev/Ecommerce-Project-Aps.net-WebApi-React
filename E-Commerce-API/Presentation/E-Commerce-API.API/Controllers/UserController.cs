using AutoMapper;
using E_Commerce_API.Application.Dto;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Persistence.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenServiceRepository _tokenService;
        private readonly IMapper _mapper;

        public UserController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IMapper mapper, IConfiguration config, ITokenServiceRepository tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _config = config;
            _tokenService = tokenService;
        }


        [HttpPost]
        public async Task<ActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginDto.Email);

            if (user is null)
            {
                return NotFound(
                new LoginRespenseDto
                {
                    Status = "404",
                    Message = "Invalid password or email!"
                });
            }

            var response = await _userManager.CheckPasswordAsync(user, userLoginDto.Password);

            if (response)
            {

                var token = _tokenService.GenerateToken(user);

                return Ok(
                new LoginRespenseDto
                {
                    Status = "200",
                    Message = $"User with the username {user.UserName} has successfully logged in!",
                    Token = await token,
                    Name = user.Name,
                    Surname = user.Surname,
                    Username = user.UserName,
                });
            }
            else
            {
                return Unauthorized(new LoginRespenseDto
                {
                    Status = "401",
                    Message = "Invalid password or email!"
                });
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult> teset()
        {
            return Ok("SSS");

        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            var isExist = await _userManager.FindByEmailAsync(userRegisterDto.Email);

            if (isExist is not null)
            {
                return Conflict(new ResponseDto
                {
                    Status = "409",
                    Message = "This email already exists"
                });
            }

            AppUser user = new AppUser()
            {
                Email = userRegisterDto.Email,
                Name = userRegisterDto.Name,
                Surname = userRegisterDto.Suranme,
                UserName = Guid.NewGuid().ToString(),
            };

            var result = await _userManager.CreateAsync(user, userRegisterDto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user,"Member");

                return Ok(new ResponseDto
                {
                    Status = "200",
                    Message = $"Student with the username {user.UserName} has succesfully registered"
                });
            }
            else
            {
                return Unauthorized(new ResponseDto
                {
                    Status = "401",
                    Message = "Unexpected error occured!"
                });
            }
        }

        [HttpGet]
        public async Task CreateRole()
        {
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
            }
            if (!await _roleManager.RoleExistsAsync("Member"))
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = "Member" });
            }
        }
    }
}
