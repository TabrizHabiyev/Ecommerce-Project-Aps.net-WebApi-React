using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_API.Domain.Entites
{
    public class AppUser:IdentityUser
    {
        public string Name { get; set;}
        public string Surname { get; set;}
        public DateTime DateOfBirth { get; set;}
        public bool IsActive { get; set;}
        public string Avatar { get; set;}
        public string Gender { get; set;}
    }
}
