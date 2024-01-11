using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.User
{
    public class SignInDto
    {
        [Required]
        [StringLength(50)]
        public string Login { get; set; }

        [Required]
        [StringLength(250)]
        public string Password { get; set; }
    }
}
