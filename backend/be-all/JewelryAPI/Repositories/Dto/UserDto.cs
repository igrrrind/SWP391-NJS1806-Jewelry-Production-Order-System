namespace Repositories.Dto
{
    public class UserDto
    {
        public string Uid { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;
        
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        
    }
}
