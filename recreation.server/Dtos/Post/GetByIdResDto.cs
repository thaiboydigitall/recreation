namespace Recreation.Server.Dtos.Post
{
    public class GetByIdResDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PosterUrl { get; set; }
    }
}
