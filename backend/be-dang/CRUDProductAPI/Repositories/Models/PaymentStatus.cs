using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class PaymentStatus
{
    public int PaymentStatusId { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
