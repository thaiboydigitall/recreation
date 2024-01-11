using Microsoft.EntityFrameworkCore;
using Recreation.Server.Models;

namespace Recreation.Server
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<SignedEmail> SignedEmails { get; set; }
        public DbSet<Comment> Comments { get; set; }
    
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
