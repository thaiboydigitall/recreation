using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Models
{
    [Index(nameof(Login), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Login { get; set; }

        [Required]
        [StringLength(500)]
        public string PasswordHash { get; set; }

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
        [DataType(DataType.Date)]
        public DateTime DateBirth { get; set; }

        [Required]
        [StringLength(255)]
        public string AvatarUrl { get; set; }

        

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        public List<Post> Posts { get; set; } = new List<Post>();
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public User()
        {
            CreatedAt = DateTime.Now;
        }
        public User(string login, string password, string name, string surname, string city, DateTime dateBirth, string avatarUrl = "images/default_avatar.jpg") : this()
        {
            Login = login.ToLower();
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            Name = name[0].ToString().ToUpper() + name.Substring(1).ToLower();
            Surname = surname[0].ToString().ToUpper() + surname.Substring(1).ToLower();
            City = city[0].ToString().ToUpper() + city.Substring(1).ToLower();
            DateBirth = dateBirth;
            AvatarUrl = avatarUrl;
        }

        public bool CheckPassword(string password) => BCrypt.Net.BCrypt.Verify(password, this.PasswordHash);
    }
}
