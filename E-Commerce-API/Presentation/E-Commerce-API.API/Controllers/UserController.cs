using AutoMapper;
using E_Commerce_API.Application.Dto;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Mvc;
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
                new ResponseDto
                {
                    Status = "404",
                    Message = "Invalid password or email!"
                });
            }

            var response = await _userManager.CheckPasswordAsync(user, userLoginDto.Password);

            if (response)
            {

                var token = _tokenService.GenerateToken(user);
                var userRole = _roleManager.FindByIdAsync(user.Id);
                return Ok(
                new LoginRespenseDto
                {
                    Status = "200",
                    Message = $"User with the username {user.Name + user.Surname} has successfully logged in!",
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


        [HttpPost]
        public async Task<ActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {

            AppUser user = new AppUser()
            {
                Email = userRegisterDto.Email,
                Gender = userRegisterDto.Gender,
                IsActive = true,
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
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
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
