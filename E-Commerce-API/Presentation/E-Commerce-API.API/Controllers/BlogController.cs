using AutoMapper;
using E_Commerce_API.Application.Dto.Blog;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IImageServices _imageServices;
        private readonly IBlogReadRepository _blogRead;
        private readonly IBlogWriteRepository _blogWrite;
        private readonly IProductReadRepository _productRead;
        private readonly IMapper _mapper;

        public BlogController(IImageServices imageServices, IBlogReadRepository blogRead, IBlogWriteRepository blogWrite, IMapper mapper, IProductReadRepository productRead)
        {
            _imageServices = imageServices;
            _blogRead = blogRead;
            _blogWrite = blogWrite;
            _mapper = mapper;
            _productRead = productRead;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Blog blog = await _blogRead.GetByIdAsync(id.ToString());
            if (blog == null) return NotFound();
            Product product = await _productRead.GetWhere(x => x.Id == blog.ProductId).FirstOrDefaultAsync();

            BlogResponseDto blogResponse = new BlogResponseDto()
            {
                Title = blog.Title,
                ProductId = blog.ProductId,
                Details = blog.Details,
                Description = blog.Description,
                Note = blog.Note,
                ProductName = product.name
            };
            return Ok(blogResponse);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromForm] BlogDto blogDto)
        {
            Blog blog = _mapper.Map<Blog>(blogDto);
            Product product = await _productRead.GetWhere(x => x.Id == blog.ProductId).FirstOrDefaultAsync();
            if (blogDto.file != null)
            {
                var imageResult = await _imageServices.AddImageAsync(blogDto.file);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                blog.ImageUrl = imageResult.SecureUrl.ToString();
                blog.PublicId = imageResult.PublicId;
            }
            blog.ProductName = product.name;
            await _blogWrite.AddAsync(blog);
            await _blogWrite.SaveAsync();

            return Ok("Zor");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            Blog blog = await _blogRead.GetByIdAsync(id.ToString());
            if (blog == null) NotFound();

            if (!string.IsNullOrEmpty(blog.PublicId)) await _imageServices.DeleteImageAsync(blog.PublicId);

            bool succest = _blogWrite.Remove(blog);
            if (succest) await _blogWrite.SaveAsync();

            return Ok("Succest");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<Blog> allBlog = _blogRead.GetAll().ToList();
            if (allBlog == null) return NotFound();
            var responseDtos = _mapper.Map<List<BlogResponseDto>>(allBlog);
            return Ok(responseDtos);
        }
    }
}
