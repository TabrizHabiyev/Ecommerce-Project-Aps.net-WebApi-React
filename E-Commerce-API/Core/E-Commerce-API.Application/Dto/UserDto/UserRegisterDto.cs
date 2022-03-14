using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Application.Dto.UserDto
{
    public class UserRegisterDto
    {    
        public string email { get; set; }
        public string password { get; set; }
        public string confirmpassword { get; set; }
    }
}
