using E_Commerce_API.Application.Dto.Basket;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketReadRepository _basketRead;
        private readonly IBasketWriteRepository _basketWrite;
        private readonly IBasketItemReadRepository _basketItemRead;
        private readonly IBasketItemWriteRepository _basketItemWrite;
        private readonly IProductReadRepository _productRead;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        public BasketController(IBasketReadRepository basketRead, IBasketWriteRepository basketWrite, IBasketItemReadRepository basketItemRead, IBasketItemWriteRepository basketItemWrite, IProductReadRepository productRead, IProductPhotoReadRepository productPhotoRead)
        {
            _basketRead = basketRead;
            _basketWrite = basketWrite;
            _basketItemRead = basketItemRead;
            _basketItemWrite = basketItemWrite;
            _productRead = productRead;
            _productPhotoRead = productPhotoRead;
        }


        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>>  GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

     

        [HttpPost] 
        public async Task<ActionResult<BasketDto>>  AddIteToBasket(Guid productId ,int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreatedBasket();

            var product = await _productRead.GetByIdAsync(productId.ToString());
            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result = await _basketWrite.SaveAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title="Problem saving item to basket"});
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(Guid productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _basketWrite.SaveAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from baskets" });
            return StatusCode(201);
        }



        private async Task<Basket> RetrieveBasket()
        {
            return _basketRead.GetAll()
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreatedBasket()
        {
           var buyerId = Guid.NewGuid().ToString();
           var cookieOptions = new CookieOptions {IsEssential = true,Expires =DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _basketWrite.AddAsync(basket);
            return basket;
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
