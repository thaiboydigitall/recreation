using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Models
{
    public class SignedEmail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        public SignedEmail() => CreatedAt = DateTime.Now;
        public SignedEmail(string emailAddress) : this()
        {
            EmailAddress = emailAddress;
        }
    }
}
