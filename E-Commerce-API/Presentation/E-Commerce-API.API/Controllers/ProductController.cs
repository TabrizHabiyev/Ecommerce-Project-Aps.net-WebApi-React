using AutoMapper;
using E_Commerce_API.API.Extensions;
using E_Commerce_API.API.RequestHelpers;
using E_Commerce_API.Application.Dto.ProductDto;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace E_Commerce_API.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IImageServices _imageServices;
        private readonly IProductReadRepository _productRead;
        private readonly IProductWriteRepository _productWrite;
        private readonly IMapper _mapper;
        private readonly IProductPhotoWriteRepository _productPhotoWrite;
        private readonly IProductPhotoReadRepository _productPhotoRead;
        private readonly ITagReadRepository _tagRead;
        private readonly ITagWriteRepository _tagWrite;
        private readonly IProductTagReadRepository _productTagRead;
        private readonly IProductTagWriteRepository _productTagWrite;
        private readonly IProductColorReadRepository _productColorRead;
        private readonly IProductColorWriteRepository _productColorWrite;
        private readonly IColorReadRepository _colorRead;
        private readonly ICampaignReadRepository _campaignRead;

        public ProductController(IImageServices imageServices, IProductReadRepository productRead, IProductWriteRepository productWrite, IMapper mapper, IProductPhotoWriteRepository productPhotoWrite, ITagReadRepository tagRead, ITagWriteRepository tagWrite, IProductTagReadRepository productTagRead, IProductTagWriteRepository productTagWrite, IProductColorReadRepository productColorRead, IProductColorWriteRepository productColorWrite, IProductPhotoReadRepository productPhotoRead, IColorReadRepository colorRead, ICampaignReadRepository campaignRead)
        {
            _imageServices = imageServices;
            _productRead = productRead;
            _productWrite = productWrite;
            _mapper = mapper;
            _productPhotoWrite = productPhotoWrite;
            _tagRead = tagRead;
            _tagWrite = tagWrite;
            _productTagRead = productTagRead;
            _productTagWrite = productTagWrite;
            _productColorRead = productColorRead;
            _productColorWrite = productColorWrite;
            _productPhotoRead = productPhotoRead;
            _colorRead = colorRead;
            _campaignRead = campaignRead;
        }


        [HttpGet("GetProducts")]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _productRead.GetAll().Sort(productParams.OrderBy)
                .Serach(productParams.SearchTerm)
                .Filter(productParams.Types, productParams.Category).Include(x => x.Category).Include(x => x.ProductTags).ThenInclude(x => x.Tag).Include(x => x.ColorProducts).ThenInclude(x => x.Color).Include(x => x.productPhotos).AsQueryable().AsSplitQuery();
        

            var products = await PageList<Product>.ToPageList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginatonHeader(products.MetaData);

            List<ProductResponseDto> responseDto = new List<ProductResponseDto>();

            foreach (var item in products)
            {
                ProductResponseDto dto = new ProductResponseDto()
                {

                    Id = item.Id,
                    name = item.name,
                    Description = item.Description,
                    Type = item.Type,
                    Price = item.Price,
                    inStock = item.inStock,
                    Quantity = item.Quantity,
                    Featured = item.Featured,
                    CategoryName = item.Category.Name,
                    CampaignId = item.CampaignId,
                    CompaignExpiryDate = item.CompaignExpiryDate,
                    photoUrl = item.productPhotos.Select(x => new ProductPhoto { PhotoUrl = x.PhotoUrl, Id = x.Id }).ToList(),
                    tagList = item.ProductTags.Select(x => x.Tag).Select(x => x.Name).ToList(),
                    colorList = item.ColorProducts.Select(x => x.Color)
                    .Select(x => new Color
                    {
                        Name = x.Name,
                        ColorCode = x.ColorCode,
                        Id = x.Id
                    }).ToList(),

                };
                responseDto.Add(dto);
            }

            return Ok(responseDto);
        }




        [HttpGet("id")]
        public async Task<IActionResult> GetProductByCategory(string categoryId)
        {
            var responseDto = new List<ProductResponseDto>();

            var product = _productRead.GetWhere(x => x.CategoryId.ToString() == categoryId);

            return Ok(product);
        }
        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = _productRead.GetWhere(x => x.Id == id).Include(x=>x.Category).Include(x => x.ProductTags).ThenInclude(x => x.Tag).Include(x => x.ColorProducts).ThenInclude(x => x.Color).Include(x => x.productPhotos).AsSplitQuery().FirstOrDefault();
            if (product == null) return NotFound();


                ProductResponseDto dto = new ProductResponseDto()
                {

                    Id = product.Id,
                    name = product.name,
                    Description = product.Description,
                    Type = product.Type,
                    Price = product.Price,
                    CategoryId = product.CategoryId,
                    inStock = product.inStock,
                    Quantity = product.Quantity,
                    CategoryName = product.Category.Name,
                    Featured = product.Featured,
                    CampaignId = product.CampaignId,
                    CompaignExpiryDate = product.CompaignExpiryDate,
                    photoUrl = product.productPhotos.Select(x => new ProductPhoto { PhotoUrl = x.PhotoUrl, Id = x.Id }).ToList(),
                    tagList = product.ProductTags.Select(x => x.Tag).Select(x => x.Name).ToList(),
                    colorList = product.ColorProducts.Select(x => x.Color)
                    .Select(x => new Color
                    {
                        Name = x.Name,
                        ColorCode = x.ColorCode,
                        Id = x.Id
                    }).ToList(),

                };
                

            return Ok(dto);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductDto productDto)
        {

            Product product = _mapper.Map<Product>(productDto);
            await _productWrite.AddAsync(product);
            var result =  await _productWrite.SaveAsync();
            if (result>0 && productDto.file != null)
            {
                if (productDto.file != null)
                {
                    foreach (var (photo,index) in productDto.file.Select((v,i)=>(v,i)))
                    {
                        var imageResult = await _imageServices.AddImageAsync(photo);
                        if (imageResult.Error != null)
                            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                        ProductPhoto productPhoto = new();
                        if (index == 0) productPhoto.IsMain = true;
                        productPhoto.ProductId = product.Id;
                        productPhoto.PhotoUrl = imageResult.SecureUrl.ToString();
                        productPhoto.PublicId = imageResult.PublicId;
                        await _productPhotoWrite.AddAsync(productPhoto);
                        int res = await _productPhotoWrite.SaveAsync();
                        if(res == 0) return BadRequest(new ProblemDetails { Title = "An error occurred while uploading the photo." });
                    }
                }
                foreach (var item in productDto.tagList)
                {
                    var tag = await _tagRead.GetSingleAsync(x => x.Name.ToLower() == item.ToLower());
                    if (tag != null)
                    {
                        await _productTagWrite.AddAsync(new() { ProductId = product.Id, TagId = tag.Id });
                    }
                    else
                    {
                        await _tagWrite.AddAsync(new() { Name = item });
                        await _productWrite.SaveAsync();
                        var newTag = await _tagRead.GetSingleAsync(x => x.Name.ToLower() == item.ToLower());
                        await _productTagWrite.AddAsync(new() { ProductId = product.Id, TagId = newTag.Id });

                    }
                    int tagRes =  await _productWrite.SaveAsync();
                    if (tagRes == 0) return BadRequest(new ProblemDetails { Title = "An error occurred while adding the tags" });
                }
                foreach (var item in productDto.colorId)
                {
                   await _productColorWrite.AddAsync(new() { ColorId = Guid.Parse(item), ProductId = product.Id });
                   int colorRes = await _productWrite.SaveAsync();

                    if (colorRes == 0) return BadRequest(new ProblemDetails { Title = "An error occurred while adding color" });
                }
            }
          return Ok("d");
        }



        // PUT api/<ProductController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromForm] ProductUpdateDto productUpdateDto)
        {
            var photo = _productPhotoRead.GetWhere(x => x.ProductId == productUpdateDto.Id).ToList();


            int deletedPhoto = 0;
            int newPhoto = 0;

            if (productUpdateDto.deletePhotoId != null) deletedPhoto = productUpdateDto.deletePhotoId.Length;

            if (productUpdateDto.file != null)newPhoto = productUpdateDto.file.Length;


            if (photo.Count - deletedPhoto + newPhoto != 4) return BadRequest("Product photo must be 4 pieces!");


            Product updateProduct = await _productRead.GetByIdAsync(productUpdateDto.Id.ToString());
            if (updateProduct == null) return NotFound();
            updateProduct.name = productUpdateDto.name;
            updateProduct.Price = productUpdateDto.Price;
            updateProduct.CampaignId = productUpdateDto.CampaignId;
            updateProduct.CategoryId = productUpdateDto.CategoryId;
            updateProduct.CompaignExpiryDate = productUpdateDto.CompaignExpiryDate;
            updateProduct.UpdateDate = DateTime.Now;
            updateProduct.Featured = productUpdateDto.Featured;
            updateProduct.Description = productUpdateDto.Description;
            updateProduct.inStock = true;
            updateProduct.Quantity = productUpdateDto.Quantity;
            updateProduct.Type = productUpdateDto.Type;
            int result = await _productWrite.SaveAsync();

            List<string> oldTag = _productTagRead.GetWhere(x => x.ProductId == updateProduct.Id).Select(x => x.Tag).Select(x => x.Name).ToList();

            List<Guid> oldColor = _productColorRead.GetWhere(x => x.ProductId == updateProduct.Id).Select(x => x.Color).Select(x => x.Id).ToList();

            List<string> addedTag = productUpdateDto.tagList.Except(oldTag).ToList();
            List<string> removeTag = oldTag.Except(productUpdateDto.tagList).ToList();

            List<Guid> addedColor = productUpdateDto.colorId.Except(oldColor).ToList();
            List<Guid> removeColor = oldColor.Except(productUpdateDto.colorId).ToList();

            int addedTagLength = addedTag.Count();
            int removedTagLength = removeTag.Count();
            int FullLengthTag = addedTagLength + removedTagLength;

            int addedColorLength = addedColor.Count();
            int removedColorLength = removeColor.Count();
            int FullLengthColor = addedColorLength + removedColorLength;

            for (int i = 1; i <= FullLengthTag; i++)
            {
                if (addedTagLength >= i)
                {
                    var tag = await _tagRead.GetSingleAsync(x => x.Name.ToLower() == addedTag[i-1].ToLower());
                    if (tag != null)
                    {
                        await _productTagWrite.AddAsync(new() { ProductId = updateProduct.Id, TagId = tag.Id });
                    }
                    else
                    {
                        await _tagWrite.AddAsync(new() { Name = addedTag[i-1] });
                        await _productWrite.SaveAsync();
                        var newTag = await _tagRead.GetSingleAsync(x => x.Name.ToLower() == addedTag[i-1].ToLower());
                        await _productTagWrite.AddAsync(new() { ProductId = updateProduct.Id, TagId = newTag.Id });
                    }
                        await _productWrite.SaveAsync();
                }

                if (removedTagLength >= i)
                {
                    var productTag = _productTagRead.GetWhere(x => x.ProductId == updateProduct.Id).Where(x => x.Tag.Name == removeTag[i - 1]).First();
                    _productTagWrite.Remove(productTag);
                    await _productTagWrite.SaveAsync();
                }
            }

            for (int i = 1; i <= FullLengthColor; i++)
            {
                if (addedColorLength >= i)
                {
                    ColorProduct colorProduct = new ColorProduct();
                    colorProduct.ProductId = updateProduct.Id;
                    colorProduct.ColorId = addedColor[i - 1];
                    await _productColorWrite.AddAsync(colorProduct);
                    await _productColorWrite.SaveAsync();
                }

                if (removedColorLength >= i)
                {
                    ColorProduct colorProduct = _productColorRead.GetWhere(c => c.ColorId == removeColor[i - 1] && c.ProductId == updateProduct.Id).First();
                    _productColorWrite.Remove(colorProduct);
                    await _productColorWrite.SaveAsync();
                }
            }

            for (int i = 1; i <= deletedPhoto + newPhoto; i++)
            {
                if (deletedPhoto >= i)
                {
                    ProductPhoto productPhoto = await _productPhotoRead.GetSingleAsync(x => x.Id == productUpdateDto.deletePhotoId[i-1]);
                    if (!string.IsNullOrEmpty(productPhoto.PublicId)) await _imageServices.DeleteImageAsync(productPhoto.PublicId);
                    _productPhotoWrite.Remove(productPhoto);
                    await _productPhotoWrite.SaveAsync();
                }
                if (newPhoto >= i)
                {

                    var imageResult = await _imageServices.AddImageAsync(productUpdateDto.file[i-1]);
                    if (imageResult.Error != null)
                        return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                    ProductPhoto productPhoto = new();
                    if (i == 1) productPhoto.IsMain = true;
                    productPhoto.ProductId = updateProduct.Id;
                    productPhoto.PhotoUrl = imageResult.SecureUrl.ToString();
                    productPhoto.PublicId = imageResult.PublicId;
                    await _productPhotoWrite.AddAsync(productPhoto);
                    int res = await _productPhotoWrite.SaveAsync();
                    if (res == 0) return BadRequest(new ProblemDetails { Title = "An error occurred while uploading the photo." });
                   
                }
            }

            return Ok();
        }


        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Product product =await _productRead.GetByIdAsync(id.ToString());
            if (product == null) return NotFound(new ProblemDetails { Title = $"The product with id {id.ToString()}  could not be found" });

            var productImage = _productPhotoRead.GetWhere(x => x.ProductId == id);

            foreach (var item in productImage)
            {
                if (!string.IsNullOrEmpty(item.PublicId)) await _imageServices.DeleteImageAsync(item.PublicId);
            }

            bool succest = _productWrite.Remove(product);
            if (succest) await _productWrite.SaveAsync();
            else return BadRequest(new ProblemDetails { Title = "An error occurred while deleting the product"});
            return Ok("Product successfully deleted");
        }

        [HttpGet("ollColor")]
        public async Task<IActionResult> GetColorList()
        {
            var color = _colorRead.GetAll().Select(x => new Color
            {
                Name = x.Name,
                ColorCode = x.ColorCode,
                Id = x.Id
            }).ToList();

            return Ok(color);
        }


        [HttpGet("compaign")]
        public async Task<IActionResult> GetCapmaignList()
        {
            var campaign = _campaignRead.GetAll().Select(x => new Campaign
            {
                Discount = x.Discount,
                Id = x.Id
            }).ToList();

            return Ok(campaign);
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetTagsList()
        {
            var tags = _tagRead.GetAll().Select(x => x.Name).ToList();

            return Ok(tags);
        }


    }
}
