using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateOnly CreatedDate { get; set; }

    public int RoleId { get; set; }

    public virtual CustomerDetail? CustomerDetail { get; set; }

    public virtual Role Role { get; set; } = null!;
}
