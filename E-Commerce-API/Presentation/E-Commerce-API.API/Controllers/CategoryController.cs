using AutoMapper;
using E_Commerce_API.Application.Dto.CategoryDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IImageServices _imageServices;
        private readonly ICategoryReadRepository _categoryRead;
        private readonly ICategoryWriteRepository _categoryWrite;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryReadRepository categoryRead, ICategoryWriteRepository categoryWrite, IMapper mapper, IImageServices imageServices)
        {
            _categoryRead = categoryRead;
            _categoryWrite = categoryWrite;
            _mapper = mapper;
            _imageServices = imageServices;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  Get(Guid id)
        {
            Category allCategory = await _categoryRead.GetByIdAsync(id.ToString());
            if (allCategory == null) return NotFound();
            var responseDtos = _mapper.Map<CategoryResponseDto>(allCategory);
            return Ok(responseDtos);
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryDto categoryDto)
        {
           var IsExist = await _categoryRead.GetSingleAsync(x => x.Name == categoryDto.Name);
            if (IsExist != null) return BadRequest("This category already exsist");
            Category category = _mapper.Map<Category>(categoryDto);

            if (categoryDto.file !=null && categoryDto.IsMain == true)
            {
                var imageResult = await _imageServices.AddImageAsync(categoryDto.file);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                category.ImageUrl = imageResult.SecureUrl.ToString();
                category.PublicId = imageResult.PublicId;
            }
           await _categoryWrite.AddAsync(category);
           await _categoryWrite.SaveAsync();

           return Ok("Zor");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromForm] CategoryUpdateDto categoryDto)
        {
            var category = await _categoryRead.GetByIdAsync(categoryDto.Id.ToString());
            if (category == null) return NotFound();

            category.Name = categoryDto.Name;
            category.IsMain = categoryDto.IsMain;
            category.IsFatured = categoryDto.IsFatured;
            if (categoryDto.MainCategoryId != null)
            {
                category.MainCategoryId = categoryDto.MainCategoryId;
            }

            if (categoryDto.file !=null && categoryDto.IsMain == true)
            {
                var imageResult = await _imageServices.AddImageAsync(categoryDto.file);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(category.PublicId)) await _imageServices.DeleteImageAsync(category.PublicId);

                category.ImageUrl = imageResult.SecureUrl.ToString();
                category.PublicId = imageResult.PublicId;
            }
            await _categoryWrite.SaveAsync();
            return Ok("Update Oldu");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<Category> allCategory = _categoryRead.GetAll().ToList();
            if (allCategory == null) return NotFound();
            var responseDtos = _mapper.Map<List<CategoryResponseDto>>(allCategory);
            return Ok(responseDtos);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            Category category = await _categoryRead.GetByIdAsync(id.ToString());
            if(category == null) NotFound();

            if (!string.IsNullOrEmpty(category.PublicId)) await _imageServices.DeleteImageAsync(category.PublicId);

            bool succest = _categoryWrite.Remove(category);
            if (succest) await _categoryWrite.SaveAsync();

            return Ok("Silindi");
        }
    }
}
