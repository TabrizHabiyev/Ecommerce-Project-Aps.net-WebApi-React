using E_Commerce_API.Domain.Entites.Common;
namespace E_Commerce_API.Domain.Entites
{
    public class Comment:BaseEntity
    {
        public string Text { get; set; }
        public Guid ProdictId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime Date { get; set; }
    }
}
