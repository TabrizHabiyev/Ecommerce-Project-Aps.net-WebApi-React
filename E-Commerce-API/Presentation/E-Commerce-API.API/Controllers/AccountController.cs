using AutoMapper;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenServiceRepository _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IMapper mapper, IConfiguration config, ITokenServiceRepository tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _config = config;
            _tokenService = tokenService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> Profile()
        {

            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;

            if (userId is null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user is null)
                return NotFound();

            var userDto = _mapper.Map<AppUserDto>(user);

            return Ok(userDto);
        }

    }
}
