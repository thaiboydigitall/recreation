using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.User
{
    public class AddSignedEmailDto
    {
        [Required]
        public string Email { get; set; }
    }
}
