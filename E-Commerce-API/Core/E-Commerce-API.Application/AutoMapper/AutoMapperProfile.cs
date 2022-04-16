using AutoMapper;
using E_Commerce_API.Application.Dto.Blog;
using E_Commerce_API.Application.Dto.CategoryDto;
using E_Commerce_API.Application.Dto.Comment;
using E_Commerce_API.Application.Dto.ProductDto;
using E_Commerce_API.Application.Dto.UserDto;
using E_Commerce_API.Domain.Entites;


namespace E_Commerce_API.Application.AutoMapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            #region User mapper
            CreateMap<UserLoginDto, AppUser>().ReverseMap();
            CreateMap<UserRegisterDto,AppUser>().ReverseMap();
            CreateMap<AppUserDto, AppUser>().ReverseMap();
            #endregion

            #region Category mapper
            CreateMap<CategoryDto, Category>().ReverseMap();
            CreateMap<Category,CategoryResponseDto>().ReverseMap();
            #endregion

            #region Product mapper
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Product, ProductUpdateDto>().ReverseMap();
            CreateMap<ProductResponseDto, Product>().ReverseMap();
            #endregion

            #region Comment mapper
            CreateMap<Comment, CommentCreateDto>().ReverseMap();
            #endregion

            #region Blog mapper
            CreateMap<BlogDto, Blog>().ReverseMap();
            CreateMap<Blog, BlogResponseDto>().ReverseMap();
            #endregion
        }
    }
}
