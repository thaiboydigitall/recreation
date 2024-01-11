using System.ComponentModel.DataAnnotations;

namespace Recreation.Server.Dtos.User
{
    public class UpdateDto
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string City { get; set; }
    }
}
