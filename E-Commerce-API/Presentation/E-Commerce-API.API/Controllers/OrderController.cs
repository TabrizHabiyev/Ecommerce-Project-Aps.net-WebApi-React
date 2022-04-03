using E_Commerce_API.API.Extensions;
using E_Commerce_API.Application.Dto.Order;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Domain.Entites.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderReadRepository _orderRead;
        private readonly IOrderWriteRepository _orderWrite;
        private readonly IBasketReadRepository _basketRead;
        private readonly IBasketWriteRepository _basketWrite;
        private readonly IProductReadRepository _productRead;
        private readonly UserManager<AppUser> _userManager;
        public OrderController(IOrderReadRepository orderRead, IOrderWriteRepository orderWrite, IBasketReadRepository basketRead, IBasketWriteRepository basketWrite, IProductReadRepository productRead, UserManager<AppUser> userManager)
        {
            _orderRead = orderRead;
            _orderWrite = orderWrite;
            _basketRead = basketRead;
            _basketWrite = basketWrite;
            _productRead = productRead;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>>  GetOrders()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            return await _orderRead.GetAll()
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == Guid.Parse(userId)).ToListAsync();
        }



        [HttpGet("{id}",Name = "GetOrder")]
        public async Task<ActionResult<Order>> Get(Guid id)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;

            return await _orderRead.GetWhere(x => x.BuyerId == Guid.Parse(userId) && x.Id == id).Include(o => o.OrderItems).FirstOrDefaultAsync();

        }
       

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateOrder(CreateOrderDto orderDto)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;

            var basket = await _basketRead.GetWhere(b => b.BuyerId == userId).Include(i => i.Items)
                .ThenInclude(p => p.Product).FirstOrDefaultAsync();
               

            if (basket ==null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });      
            
            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _productRead.GetWhere(x => x.Id == item.ProductId).Include(p => p.productPhotos).FirstOrDefaultAsync();
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.name,
                    PictureUrl = productItem.productPhotos.Select(x => x.PhotoUrl).First()
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                };
                items.Add(orderItem);
                productItem.Quantity -= item.Quantity;
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var order = new Order
            {
                OrderItems = items,
                BuyerId = Guid.Parse(userId),
                ShippingAddress = orderDto.ShippingAdress,
                SubTotal = subtotal,
            };

            await _orderWrite.AddAsync(order);
             _basketWrite.Remove(basket);

            if (orderDto.SaveAdress)
            {
                var user =await _userManager.FindByIdAsync(userId);
                user.Address = new UserAddress
                {
                    FullName = orderDto.ShippingAdress.FullName,
                    Adress1 = orderDto.ShippingAdress.Adress1,
                    Adress2 = orderDto.ShippingAdress.Adress2,
                    City = orderDto.ShippingAdress.City,
                    State = orderDto.ShippingAdress.State,
                    Zip = orderDto.ShippingAdress.Zip,
                    Country = orderDto.ShippingAdress.Country,
                };
               await  _userManager.UpdateAsync(user);
            }
           var result = await _orderWrite.SaveAsync();

            if (result > 0) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem Creating Order");
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
