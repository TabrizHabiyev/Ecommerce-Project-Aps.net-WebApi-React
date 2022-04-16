

using System.ComponentModel.DataAnnotations;

namespace E_Commerce_API.Application.Dto.Comment
{
   public class CommentCreateDto
    {
        [Required]
        public string Text { get; set; }
        [Required]
        public Guid ProductId { get; set; }
        public Guid ProdictId { get; set; } = Guid.NewGuid();
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
