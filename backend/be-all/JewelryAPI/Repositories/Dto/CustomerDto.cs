using Repositories.Models;

namespace Repositories.Dto
{
    public class CustomerDto
    {
        public string Uid { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;
        //RoleId
        public string? RoleName { get; set; }
        //CustomerDetail
        public int CustomerId { get; set; }

        public string Sex { get; set; } = null!;

        public DateOnly BirthDate { get; set; }

        public string AddressLine { get; set; } = null!;

        public string Province { get; set; } = null!;

        public string DistrictTown { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
