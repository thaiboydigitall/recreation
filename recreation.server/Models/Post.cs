using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [StringLength(255)]
        public string PosterUrl { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; }

        [Required]
        [StringLength(1500)]
        public string Description { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        public List<Comment> Comments { get; set; } = new List<Comment>();

        [Required]
        [DefaultValue(0)]
        public uint Views { get; set; }
        public Post()
        {
            CreatedAt = DateTime.Now;
            Views = 0;
        }
        public Post(User user, string posterUrl, string title, string description) : this()
        {
            PosterUrl = posterUrl;
            Title = title;
            Description = description;
            User = user;
        }
    }
}
