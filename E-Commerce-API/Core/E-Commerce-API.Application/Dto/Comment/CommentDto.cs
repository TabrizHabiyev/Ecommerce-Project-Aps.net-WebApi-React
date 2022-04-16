

namespace E_Commerce_API.Application.Dto.Comment
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Text  { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? UserFullName { get; set; }
        public string? UserPhotoUrl { get; set; }
    }
}
