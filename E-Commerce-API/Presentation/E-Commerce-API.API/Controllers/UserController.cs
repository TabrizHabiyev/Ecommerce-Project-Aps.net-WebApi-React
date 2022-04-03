using AutoMapper;
using E_Commerce_API.Application.Dto;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using E_Commerce_API.Application.Dto.Basket;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenServiceRepository _tokenService;
        private readonly IMapper _mapper;
        private readonly IBasketReadRepository _basketRead;
        private readonly IBasketWriteRepository _basketWrite;
        private readonly IProductReadRepository _productRead;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        public UserController(UserManager<AppUser> userManager, RoleManager<Role> roleManager, IMapper mapper, IConfiguration config, ITokenServiceRepository tokenService, IBasketReadRepository basketRead, IBasketWriteRepository basketWrite, IProductReadRepository productRead, IProductPhotoReadRepository productPhotoRead)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _config = config;
            _tokenService = tokenService;
            _basketRead = basketRead;
            _basketWrite = basketWrite;
            _productRead = productRead;
            _productPhotoRead = productPhotoRead;
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

                var userBasket = await RetrieveBasket(user.Id.ToString());

                var anonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

                if(anonymousBasket != null)
                {
                    if (userBasket != null) _basketWrite.Remove(userBasket);
                    anonymousBasket.BuyerId = user.Id.ToString();
                    Response.Cookies.Delete("buyerId");
                    await  _basketWrite.SaveAsync();
                }

                var token = _tokenService.GenerateToken(user);
                var userRole = _roleManager.FindByIdAsync(user.Id.ToString());
                return Ok(
                new LoginRespenseDto
                {
                    Status = "200",
                    Message = $"User successfully logged in!",
                    Token = await token,
                    Username = user.UserName,
                    Basket = anonymousBasket != null ? MapBasketToDto(anonymousBasket) : userBasket != null ? MapBasketToDto(userBasket):default

                }) ;
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


        [Authorize]
        [HttpGet]
         public async Task<ActionResult<UserAddress>> GetSavedAddress()
         {
            var adress = await _userManager.Users.Where(x => x.Id == Guid.Parse(GetIdentityUserId()))
                .Select(user => user.Address)
                .FirstOrDefaultAsync();
            return adress;
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


        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return _basketRead.GetAll()
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            var userId = GetIdentityUserId();
            return userId ?? Request.Cookies["buyerId"];
        }

        private string GetIdentityUserId()
        {
            string userId = null;
            if (User.Identity.IsAuthenticated)
            {
                userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            }
            return userId;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.name,
                    Price = item.Product.Price,
                    PictureUrl = _productPhotoRead.GetWhere(x => x.ProductId == item.ProductId && x.IsMain == true).Select(x => x.PhotoUrl).First(),
                    Type = item.Product.Type,
                    Quantity = item.Quantity,

                }).ToList()
            };
        }
    }
}
