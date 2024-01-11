using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int PostId { get; set; }
        public Post Post { get; set; }

        [Required]
        [StringLength(500)]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        public Comment() => CreatedAt = DateTime.Now;
        public Comment(User user, Post post, string content) : this()
        {
            User = user;
            Post = post;
            Content = content;
        }
    }
}
