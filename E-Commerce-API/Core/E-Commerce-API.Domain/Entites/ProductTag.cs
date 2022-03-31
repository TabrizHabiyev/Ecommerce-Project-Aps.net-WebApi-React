using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class ProductTag:BaseEntity
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
