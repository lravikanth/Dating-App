using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.Models
{
    public class User
    {
     [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] Passwordsalt { get; set; }
    }
}