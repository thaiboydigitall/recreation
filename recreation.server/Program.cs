using Microsoft.EntityFrameworkCore;
using Recreation.Server;
using Recreation.Server.Repositories;
using Recreation.Server.Repositories.Interfaces;
using Recreation.Server.Services;

var builder = WebApplication.CreateBuilder(args);

const string ReactAppHost = "https://localhost:5173";

builder.Services.AddCors(options => options.AddPolicy("ReactPolicy", builder =>
{
    builder
        .WithOrigins(ReactAppHost)
        .AllowAnyMethod()
        .AllowCredentials()
        .AllowAnyHeader();
}));

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer("workstation id=Recreation.mssql.somee.com;packet size=4096;user id=nagoevislam2711_SQLLogin_1;pwd=7m7vxfk1qj;data source=Recreation.mssql.somee.com;persist security info=False;initial catalog=Recreation;Integrated Security=false;TrustServerCertificate=True");
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();

builder.Services.AddScoped<JwtService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.MapFallbackToFile("/index.html");

app.Run();
