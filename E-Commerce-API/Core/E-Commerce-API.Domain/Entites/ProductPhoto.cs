using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class ProductPhoto:BaseEntity
    {
        public string PhotoUrl { get; set; }
        public bool IsMain { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public string? PublicId { get; set; }
    }
}
