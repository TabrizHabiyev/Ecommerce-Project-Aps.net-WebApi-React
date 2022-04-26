using AutoMapper;
using E_Commerce_API.Application.Dto.CategoryDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryReadRepository _categoryRead;
        private readonly ICategoryWriteRepository _categoryWrite;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryReadRepository categoryRead, ICategoryWriteRepository categoryWrite, IMapper mapper)
        {
            _categoryRead = categoryRead;
            _categoryWrite = categoryWrite;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  Get(string id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryDto categoryDto)
        {
           var IsExist = await _categoryRead.GetSingleAsync(x => x.Name == categoryDto.Name);
            if (IsExist != null) return BadRequest("This category already exsist");

           Category category = _mapper.Map<Category>(categoryDto);
           await _categoryWrite.AddAsync(category);
           await _categoryWrite.SaveAsync();
           return Ok("");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            IQueryable<Category> categoryDto =_categoryRead.GetAll();
            return Ok(categoryDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(string id)
        {
            Category category = await _categoryRead.GetByIdAsync(id);
            if(category == null) NotFound();

            bool succest = _categoryWrite.Remove(category);
            if (succest) await _categoryWrite.SaveAsync();

            return Ok();
        }
    }
}
