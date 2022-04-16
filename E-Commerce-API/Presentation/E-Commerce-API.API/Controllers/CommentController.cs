using AutoMapper;
using E_Commerce_API.Application.Dto.Comment;
using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_Commerce_API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CommentController: ControllerBase
    {
        private readonly ICommentReadRepository _commenRead;
        private readonly ICommentWriteRepository _commenWrite;
        private readonly IOrderReadRepository _orderRead;
        private readonly IMapper _mapper;
        public CommentController(ICommentReadRepository commenRead, ICommentWriteRepository commenWrite, IMapper mapper)
        {
            _commenRead = commenRead;
            _commenWrite = commenWrite;
            _mapper = mapper;
        }




        [HttpGet("id",Name ="GetById")]
        public async Task<IActionResult> GetComment(Guid Productid)
        {
            List<CommentDto> comments = new List<CommentDto>();
            var comment = await _commenRead.GetWhere(x => x.ProductId == Productid).ToListAsync();
            foreach (var item in comment)
            {
                CommentDto dto = new CommentDto()
                {
                    Id = item.Id,
                    Text = item.Text,
                    //UserFullName = item.User.UserName,
                    //UserPhotoUrl = item.User.Avatar,
                };
                comments.Add(dto);
            }

            return Ok(comments);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CommentCreateDto comment)
        {
            if (comment.Text == null || comment.Text.Length < 25) return BadRequest(new ProblemDetails { Title = "Comment min length must be min 25 length" });
            var userId = String.Empty;
            if (User.Identity.IsAuthenticated)
            {
                userId =  User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "You have to login first before you can comment." });
            }

            var isExist = await _commenRead.GetWhere(c => c.ProductId == comment.ProductId && c.UserId == Guid.Parse(userId)).FirstOrDefaultAsync();
            if (isExist != null) return BadRequest(new ProblemDetails { Title = "Only one comment allowed" });


               Comment newComment = _mapper.Map<Comment>(comment);
               newComment.UserId = Guid.Parse(userId);
               await _commenWrite.AddAsync(newComment);
               var succest = await _commenWrite.SaveAsync() > 0;

               if (!succest) return BadRequest(new ProblemDetails { Title = "An error occurred, try again later" });

            return CreatedAtRoute("GetById",newComment.Text);
        }
    }
}
