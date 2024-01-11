using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.Post
{
    public class AddCommentDto
    {
        [Required]
        public int PostId { get; set; }

        [Required]
        [StringLength(500)]
        public string Comment { get; set; }
    }
}
