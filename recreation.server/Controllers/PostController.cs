using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Recreation.Server.Attributes;
using Recreation.Server.Dtos.Post;
using Recreation.Server.Repositories.Interfaces;
using Recreation.Server.Services;

namespace Recreation.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    public class PostController : Controller
    {
        private readonly IUserRepository _userRep;
        private readonly IPostRepository _postRep;
        private readonly JwtService _jwt;
        private readonly IWebHostEnvironment _env;

        public PostController(IPostRepository postRep, JwtService jwtService, IWebHostEnvironment webHostEnvironment, IUserRepository userRepository)
        {
            _postRep = postRep;
            _jwt = jwtService;
            _env = webHostEnvironment;
            _userRep = userRepository;
        }

        private string GetRequestLogin()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var user = _jwt.Verify(token);

            if (user?.Claims?.FirstOrDefault(c => c.Type == "login") == null)
                return "";

            return user.Claims.First(c => c.Type == "login").Value;
        }

        [HttpPost]
        [Route("create")]
        [JwtAuth]
        public async Task<IActionResult> Create(CreatePostDto dto)
        {
            try
            {
                string path = $"images/{Guid.NewGuid()}{dto.Image.FileName}";

                using (var fileStream = new FileStream(_env.WebRootPath + '/' + path, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(fileStream);
                }
                var user = await _userRep.Get(this.GetRequestLogin());
                
                if (user == null)
                    return BadRequest();

                var post = await _postRep.Add(new Models.Post(user, path, dto.Title, dto.Description));

                if (post == null)
                    return StatusCode(500);

                return Ok(new
                {
                    postId = post.Id
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getlatests")]
        public async Task<IActionResult> GetLatests()
        {
            try
            {
                return Ok(await _postRep.GetLatests(6));
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _postRep.Get(id);
                var comments = new List<GetByIdComment>();

                foreach(var comment in result.Comments)
                {
                    comments.Add(new GetByIdComment
                    {
                        Id = comment.Id,
                        PostId = comment.PostId,
                        Content = comment.Content,
                        CreatedAt = comment.CreatedAt,
                        UserId = comment.UserId
                    });
                }

                return Ok(new
                {
                    id = result.Id,
                    title = result.Title,
                    createdAt = result.CreatedAt,
                    description = result.Description,
                    userId = result.UserId,
                    posterUrl = result.PosterUrl,
                    views = result.Views,
                    comments
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("addcomment")]
        public async Task<IActionResult> AddComment(AddCommentDto dto)
        {
            try
            {
                await _postRep.AddComment(new Models.Comment(await _userRep.Get(this.GetRequestLogin()), await _postRep.Get(dto.PostId), dto.Comment));

                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getcount")]
        public async Task<IActionResult> GetCount()
        {
            try
            {
                return Ok(_postRep.GetCount());
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getpage")]
        public async Task<IActionResult> GetPage(int count, int page, int order = 1)
        {
            try
            {
                return Ok(await _postRep.GetPage(count, page, (Orders)order));
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getmyposts")]
        [JwtAuth]
        public async Task<IActionResult> GetMyPosts()
        {
            try
            {
                var result = new List<GetByIdResDto>();

                foreach (var post in (await _userRep.Get(this.GetRequestLogin())).Posts)
                {
                    result.Add(new GetByIdResDto
                    {
                        Id = post.Id,
                        UserId = post.UserId,
                        PosterUrl = post.PosterUrl,
                        CreatedAt = post.CreatedAt,
                        Description = post.Description,
                        Title = post.Title
                    });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> Search(int count, int page, string text)
        {
            try
            {
                return Ok(await _postRep.GetPage(count, page, Orders.FirstNews, text));
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getcountsearch")]
        public async Task<IActionResult> GetCountSearch(string text)
        {
            try
            {
                return Ok(_postRep.GetCountSearch(text));
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
