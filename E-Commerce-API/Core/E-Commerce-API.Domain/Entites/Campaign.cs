using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class Campaign:BaseEntity
    {
        public int Discount { get; set; }
        public List<Product> Products { get; set; }
    }
}
