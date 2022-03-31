using E_Commerce_API.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class Color:BaseEntity
    {
      public string Name { get; set; }
      public string ColorCode { get; set; }
      public List<ColorProduct> ColorProducts { get; set; }
    }
}
