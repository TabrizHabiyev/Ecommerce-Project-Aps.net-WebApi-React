using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductPhotoController : ControllerBase
    {
        private readonly IImageServices _imageServices;
        private readonly IProductPhotoWriteRepository _productPhotoWrite;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        public ProductPhotoController(IImageServices imageServices, IProductPhotoWriteRepository productPhotoWrite, IProductPhotoReadRepository productPhotoRead)
        {
            _imageServices = imageServices;
            _productPhotoWrite = productPhotoWrite;
            _productPhotoRead = productPhotoRead;
        }

        // GET: api/<ProductPhotoController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProductPhotoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductPhotoController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductPhotoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<ProductPhotoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult>  Delete(Guid id)
        {
            var productImage = await _productPhotoRead.GetSingleAsync(x => x.Id == id);
            if (productImage == null) return NotFound();
                if (!string.IsNullOrEmpty(productImage.PublicId)) await _imageServices.DeleteImageAsync(productImage.PublicId);
            bool success = _productPhotoWrite.Remove(productImage);
            if (!success) return BadRequest();
            return Ok();
        }
    }
}
