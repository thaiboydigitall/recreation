namespace Recreation.Server.Dtos.Post
{
    public class GetByIdComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int PostId { get; set; }
    }
}
