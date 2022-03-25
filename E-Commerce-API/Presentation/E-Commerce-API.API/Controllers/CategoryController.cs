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


        [HttpGet]
        public IEnumerable<string> Get()
        {
            
            return new string[] { "value1", "value2" };
        }


        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

 
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto categoryDto)
        {
           var IsExist = await _categoryRead.GetSingleAsync(x => x.Name == categoryDto.Name);
            if (IsExist != null) return BadRequest("This category already exsist");
           Category category = _mapper.Map<Category>(categoryDto);
           await _categoryWrite.AddAsync(category);
           await _categoryWrite.SaveAsync();
           return Ok("");
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
