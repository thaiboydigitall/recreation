using Microsoft.EntityFrameworkCore;
using Recreation.Server.Models;
using Recreation.Server.Repositories.Interfaces;

namespace Recreation.Server.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Post?> Add(Post post)
        {
            try
            {
                var result = (await _context.Posts.AddAsync(post)).Entity;
               await _context.SaveChangesAsync();

                return result;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<List<Post>> GetLatests(int count)
        {
            try
            {
                return (_context.Posts.Count() > count) ? await _context.Posts.OrderByDescending(p => p.Views).Take(count).ToListAsync() : await _context.Posts.ToListAsync();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<Post>();
            }
        }
        public async Task<Post> Get(int id)
        {
            try
            {
                var post = await _context.Posts.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == id);
                post.Views += 1;
                await _context.SaveChangesAsync();
                return post;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<Comment> AddComment(Comment comment)
        {
            try
            {
                var result = (await _context.Comments.AddAsync(comment)).Entity;
                await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }

        public async Task<List<Post>> GetPage(int count, int page, Orders order, string searchText = "")
        {
            var result = new List<Post>();
            try
            {
                switch (order)
                {
                    case Orders.FirstNews:
                        result = await _context.Posts.Where(p => p.Title.Contains(searchText) || p.Description.Contains(searchText)).OrderByDescending(d => d.CreatedAt).Skip((page * count) - count).Take(count).ToListAsync();
                        break;
                    case Orders.FirstOlds:
                        result = await _context.Posts.Where(p => p.Title.Contains(searchText) || p.Description.Contains(searchText)).OrderBy(d => d.CreatedAt).Skip((page * count) - count).Take(count).ToListAsync();
                        break;
                    case Orders.FirstPopular:
                        result = await _context.Posts.Where(p => p.Title.Contains(searchText) || p.Description.Contains(searchText)).OrderByDescending(d => d.Views).Skip((page * count) - count).Take(count).ToListAsync();
                        break;
                }
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
            return result;
        }

        public int GetCount() => _context.Posts.Count();
        public int GetCountSearch(string text) => _context.Posts.Where(p => p.Title.Contains(text) || p.Description.Contains(text)).Count();
    }
}
