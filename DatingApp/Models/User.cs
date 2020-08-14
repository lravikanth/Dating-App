using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.Models
{
    public class User
    {
     [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(50)]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] Passwordsalt { get; set; }
        
        [StringLength(50)]
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
        [StringLength(50)]
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        [StringLength(500)]
        public string Introduction { get; set; }
    [StringLength(500)]
        public string LookingFor { get; set; }
    [StringLength(500)]
        public string Interests { get; set; }
        [StringLength(50)]
        public string City { get; set; }
        [StringLength(50)]
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }


        
    }
}