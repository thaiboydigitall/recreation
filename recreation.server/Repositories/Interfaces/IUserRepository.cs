using Recreation.Server.Models;

namespace Recreation.Server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public bool IsExist(string login);
        public bool IsEmailExist(string email);
        public Task<User?> SignUp(User user);
        public Task<User?> Get(string login);
        public Task<User?> Get(int id);
        public Task SaveChanges();
        public Task<List<Post>> GetMyPosts(int userId);
        public Task<SignedEmail> AddSignedEmail(SignedEmail email);
    }
}
