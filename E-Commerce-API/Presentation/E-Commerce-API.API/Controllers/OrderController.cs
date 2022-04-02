using E_Commerce_API.Domain.Entites.OrderAggregate;
using Microsoft.AspNetCore.Mvc;


namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderReadRepository _orderRead;
        private readonly IOrderWriteRepository _orderRead;

        public OrderController(IOrderReadRepository orderRead, IOrderWriteRepository orderRead)
        {
            this._orderRead = orderRead;
            this._orderRead = orderRead;
        }

        [HttpGet]
        public async Task<ActionResult<Order>>  GetOrders()
        {
          
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
