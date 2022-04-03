using AutoMapper;
using E_Commerce_API.Application.Dto.Basket;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenServiceRepository _tokenService;
        private readonly IMapper _mapper;
        private readonly IBasketReadRepository _basketRead;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        public AccountController(UserManager<AppUser> userManager, RoleManager<Role> roleManager, IMapper mapper, IConfiguration config, ITokenServiceRepository tokenService, IBasketReadRepository basketRead, IProductPhotoReadRepository productPhotoRead)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _config = config;
            _tokenService = tokenService;
            _basketRead = basketRead;
            _productPhotoRead = productPhotoRead;
        }

        [HttpGet]
       [Authorize]
        public async Task<ActionResult<AppUserDto>> Profile()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;

            if (userId is null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId.ToString());


            if (user is null)
                return NotFound();
            var userBasket = await RetrieveBasket(userId);
            var userDto = _mapper.Map<AppUserDto>(user);
            userDto.Basket = MapBasketToDto(userBasket);
            return Ok(userDto);
        }


        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            return _basketRead.GetAll()
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.BuyerId == buyerId);
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
