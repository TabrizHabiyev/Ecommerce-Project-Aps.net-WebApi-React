using E_Commerce_API.Domain.Entites.Common;

namespace E_Commerce_API.Domain.Entites
{
    public class Tag:BaseEntity
    {
        public string Name { get; set; }
        public List<ProductTag> ProductTags { get; set; }
    }
}
