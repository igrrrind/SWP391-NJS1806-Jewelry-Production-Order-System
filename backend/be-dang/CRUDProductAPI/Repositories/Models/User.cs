using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class User
{
    public string Uid { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int RoleId { get; set; }

    public virtual CustomerDetail? CustomerDetail { get; set; }

    public virtual Role Role { get; set; } = null!;
}
