using E_Commerce_API.Application.Dto.Basket;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Infrastructure.Interfaces.PymentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PaymentController:ControllerBase
    {
        private readonly IstripePaymentService _stripePayment;
        private readonly IBasketReadRepository _basketRead;
        private readonly IBasketWriteRepository _basketWrite;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        public PaymentController(IstripePaymentService stripePayment, IBasketReadRepository basketRead, IBasketWriteRepository basketWrite, IProductPhotoReadRepository productPhotoRead)
        {
            _stripePayment = stripePayment;
            _basketRead = basketRead;
            _basketWrite = basketWrite;
            _productPhotoRead = productPhotoRead;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {

            var basket = await _basketRead.GetAll()
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == GetIdentityUserId());

            if (basket == null) return NotFound();

            var intent = await _stripePayment.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _basketWrite.Update(basket);

            var result = await _basketWrite.SaveAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });

            return MapBasketToDto(basket);

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
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
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
