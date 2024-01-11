using Recreation.Server.Models;

namespace Recreation.Server.Repositories.Interfaces
{
    public enum Orders
    {
        FirstNews = 1,
        FirstOlds = 2,
        FirstPopular = 3
    }

    public interface IPostRepository
    {
        
        public Task<Post?> Add(Post post);
        public Task<List<Post>> GetLatests(int count);
        public Task<Post> Get(int id);
        public Task<Comment> AddComment(Comment comment);

        public Task<List<Post>> GetPage(int count, int page, Orders order, string searchText = "");
        public int GetCount();
        public int GetCountSearch(string text);
    }
}
