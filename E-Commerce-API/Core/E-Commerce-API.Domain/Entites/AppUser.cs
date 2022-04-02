using Microsoft.AspNetCore.Identity;


namespace E_Commerce_API.Domain.Entites
{
    public class AppUser:IdentityUser<Guid>
    {
        public DateTime DateOfBirth { get; set;}
        public bool IsActive { get; set;}
        public string? Avatar { get; set;}
        public string Gender { get; set;}
        public UserAddress Address { get; set; }
    }
}
