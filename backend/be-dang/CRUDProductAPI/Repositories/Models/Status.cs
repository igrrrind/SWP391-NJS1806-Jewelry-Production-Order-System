using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Status
{
    public int StatusId { get; set; }

    public string StatusDetail { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
