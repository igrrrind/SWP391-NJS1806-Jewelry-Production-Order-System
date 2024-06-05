using System;
using System.Collections.Generic;

namespace SWP.Models;

public partial class CustomerDetail
{
    public int CustomerId { get; set; }

    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Sex { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string AddressLine { get; set; } = null!;

    public string Province { get; set; } = null!;

    public string DistrictTown { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
