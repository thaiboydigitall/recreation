using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public IFormFile Image { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; }

        [Required]
        [StringLength(1500)]
        public string Description { get; set; }
    }
}
