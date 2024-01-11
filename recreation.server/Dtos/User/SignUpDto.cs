using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.User
{
    public class SignUpDto
    {
        [Required]
        [StringLength(50)]
        public string Login { get; set; }

        [Required]
        [StringLength(250)]
        public string Password { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        public DateTime DateBirth { get; set; }

    }
}
