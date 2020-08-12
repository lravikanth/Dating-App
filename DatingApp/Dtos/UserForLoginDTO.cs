using System.ComponentModel.DataAnnotations;

namespace DatingApp.Dtos
{
    public class UserForLoginDTO
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}