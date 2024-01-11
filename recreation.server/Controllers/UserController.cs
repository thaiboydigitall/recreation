using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Recreation.Server.Attributes;
using Recreation.Server.Dtos.Post;
using Recreation.Server.Dtos.User;
using Recreation.Server.Models;
using Recreation.Server.Repositories.Interfaces;
using Recreation.Server.Services;

namespace Recreation.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRep;
        private readonly JwtService _jwt;

        public UserController(IUserRepository userRep, JwtService jwtService)
        {
            _userRep = userRep;
            _jwt = jwtService;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp(SignUpDto dto)
        {
            try
            {
                if (_userRep.IsExist(dto.Login))
                    return Unauthorized(new { error = "Логин занят" });

                User? user = await _userRep.SignUp(new Models.User(dto.Login, dto.Password, dto.Name, dto.Surname, dto.City, dto.DateBirth));
                if (user == null)
                    return Unauthorized(new { error = "Неожиданная ошибка, попробуйте позже" });

                string token = _jwt.Generate(user.Login, user.Id, user.Name, user.Surname);

                return Ok(new
                {
                    token
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn(SignInDto dto)
        {
            try
            {
                if (!_userRep.IsExist(dto.Login))
                    return Unauthorized(new
                    {
                        error = "Недействительный логин !"
                    });

                var user = await _userRep.Get(dto.Login);
                if (user == null)
                    return Unauthorized(new
                    {
                        error = "Ошибка сервера, попробуйте позже"
                    });

                if (!user.CheckPassword(dto.Password))
                    return Unauthorized(new
                    {
                        error = "Неверный пароль !"
                    });

                var token = _jwt.Generate(user.Login, user.Id, user.Name, user.Name);

                return Ok(new
                {
                    token
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        private string GetRequestLogin()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var user = _jwt.Verify(token);

            if (user?.Claims?.FirstOrDefault(c => c.Type == "login") == null)
                return "";

            return user.Claims.First(c => c.Type == "login").Value;
        }

        [HttpGet]
        [Route("authentication")]
        [JwtAuth]
        public async Task<IActionResult> Authentication()
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                var user = _jwt.Verify(token);
                if (user == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                if (user.Claims?.FirstOrDefault(c => c.Type == "login") == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                var resultUser = await _userRep.Get(user.Claims.First(c => c.Type == "login").Value);

                if (resultUser == null)
                    return Unauthorized(new { error = "Токен недействителен !" });

                return Ok(new
                {
                    login = resultUser.Login,
                    userId = resultUser.Id,
                    name = resultUser.Name,
                    surname = resultUser.Surname,
                    avatar = resultUser.AvatarUrl,
                    city = resultUser.City,
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.ToString());
                return StatusCode(500, new
                {
                    error = "Ошибка сервера"
                });
            }
        }

        [HttpGet]
        [Route("getstatistics")]
        [JwtAuth]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var user = await _userRep.Get(GetRequestLogin());
                
                if (user == null) return BadRequest();

                return Ok(new
                {
                    dateBirth = user.DateBirth.ToString("yyyy-MM-dd"),
                    createdAt = user.CreatedAt.ToString("dd.MM.yyyy"),
                    posts = user.Posts.Count(),
                    comments = user.Comments.Count
                });
            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }

        }

        [HttpPut]
        [Route("update")]
        [JwtAuth]
        public async Task<IActionResult> Update(UpdateDto dto)
        {
            try
            {
                var user = await _userRep.Get(this.GetRequestLogin());

                if (user == null) return BadRequest();

                string oldLogin = user.Login;

                user.Login = dto.Login;
                user.Name = dto.Name;
                user.Surname = dto.Surname;
                user.City = dto.City;
                if (dto.Password.Length > 7)
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                await _userRep.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getprofilebyid")]
        public async Task<IActionResult> GetProfileById(int id)
        {
            try
            {
                var user = await _userRep.Get(id);
                if (user == null)
                    return BadRequest();

                return Ok(new
                {
                    avatarUrl = user.AvatarUrl,
                    name = user.Name,
                    surname = user.Surname,
                    city = user.City
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("addsignedemail")]
        public async Task<IActionResult> AddSignedEmail(AddSignedEmailDto dto)
        {
            try
            {
                if (_userRep.IsEmailExist(dto.Email))
                    return BadRequest(new
                    {
                        error = "Почта уже подписана !"
                    });

                await _userRep.AddSignedEmail(new SignedEmail(dto.Email.ToLower()));

                return Ok();
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getcountcreatedposts")]
        public async Task<IActionResult> GetCountCreatedPosts()
        {
            try
            {
                return Ok(new
                {
                    count = (await _userRep.Get(this.GetRequestLogin())).Posts.Count()
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("getcountcreatedcomments")]
        public async Task<IActionResult> GetCountCreatedComments()
        {
            try
            {
                return Ok(new
                {
                    count = (await _userRep.Get(this.GetRequestLogin())).Comments.Count()
                });
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return StatusCode(500);
            }
        }

    }
}
