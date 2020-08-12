using System.ComponentModel.DataAnnotations;

namespace DatingApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [StringLength(10,MinimumLength=4, ErrorMessage="Password needs to be between 4 and 6.")]
        public string Password { get; set; }
    }
}