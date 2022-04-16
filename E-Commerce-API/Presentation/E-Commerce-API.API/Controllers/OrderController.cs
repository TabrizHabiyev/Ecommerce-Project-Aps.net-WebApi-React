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
        [Authorize]
        public async Task<ActionResult<List<OrderDto>>>  GetOrders()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            return await _orderRead.GetAll()
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == Guid.Parse(userId)).ToListAsync();
        }


        [HttpGet("getOllOrders")]
        public async Task<ActionResult<List<Order>>> GetOllOrers()
        {
            var orders = await _orderRead.GetAll().Include(o => o.OrderItems).ToListAsync();
            if (orders == null) return NotFound();
            List<Order> ordersLis = new List<Order>();

            foreach (var item in orders)
            {
                Order order = new Order()
                {
                    BuyerId = item.BuyerId,
                    ShippingAddress = item.ShippingAddress,
                    OrderDate = item.OrderDate,
                    OrderItems = item.OrderItems,
                    SubTotal = item.SubTotal,
                    Discount = item.Discount,
                    Cupon = item.Cupon,
                    OrderStatus = item.OrderStatus,
                    PaymentIntentId = item.PaymentIntentId
                };
                ordersLis.Add(order);
            }

            return ordersLis;
        }

        [HttpGet("{id}",Name = "GetOrder")]
        [Authorize]
        public async Task<ActionResult<Order>> Get(Guid id)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;

            return await _orderRead.GetWhere(x => x.BuyerId == Guid.Parse(userId) && x.Id == id).Include(o => o.OrderItems).FirstOrDefaultAsync();

        }
       

        [HttpPost]
        [Authorize]
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
                PaymentIntentId = basket.PaymentIntentId
            };

            await _orderWrite.AddAsync(order);
             _basketWrite.Remove(basket);

            if (orderDto.SaveAdress)
            {
                var user = await _userManager.Users.Include(a => a.Address)
                   .FirstOrDefaultAsync(x => x.Id == Guid.Parse(userId));
                var adress  = new UserAddress
                {
                    FullName = orderDto.ShippingAdress.FullName,
                    Adress1 = orderDto.ShippingAdress.Adress1,
                    Adress2 = orderDto.ShippingAdress.Adress2,
                    City = orderDto.ShippingAdress.City,
                    State = orderDto.ShippingAdress.State,
                    Zip = orderDto.ShippingAdress.Zip,
                    Country = orderDto.ShippingAdress.Country,
                };
                user.Address = adress;
                
            }
           var result = await _orderWrite.SaveAsync();

            if (result > 0) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem Creating Order");
        }
    }
}
