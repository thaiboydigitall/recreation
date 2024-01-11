using Microsoft.EntityFrameworkCore;
using Recreation.Server.Models;
using Recreation.Server.Repositories.Interfaces;

namespace Recreation.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public bool IsExist(string login) => _context.Users.FirstOrDefault(u => u.Login == login.ToLower()) != null;
        public bool IsEmailExist(string email) => _context.SignedEmails.FirstOrDefault(se => se.EmailAddress == email.ToLower()) != null;

        public async Task<User?> SignUp(User user)
        {
            try
            {
                var result = (await _context.Users.AddAsync(user))?.Entity;
                await _context.SaveChangesAsync();
                return result;
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<User?> Get(string login) => await _context.Users.Include(u => u.Posts).Include(u => u.Comments).FirstAsync(u => u.Login == login.ToLower());
        public async Task<User?> Get(int id) => await _context.Users.Include(u => u.Posts).Include(u => u.Comments).FirstOrDefaultAsync(u => u.Id == id);

        public async Task SaveChanges() => await _context.SaveChangesAsync();

        public async Task<List<Post>> GetMyPosts(int userId) => await _context.Posts.Where(p => p.UserId == userId).ToListAsync();
        public async Task<SignedEmail> AddSignedEmail(SignedEmail email)
        {
            try
            {
                var result = (await _context.SignedEmails.AddAsync(email)).Entity;
                await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

    }
}
