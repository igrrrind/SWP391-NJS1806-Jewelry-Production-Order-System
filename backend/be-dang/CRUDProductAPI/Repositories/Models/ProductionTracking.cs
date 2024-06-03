using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class ProductionTracking
{
    public int ProductionId { get; set; }

    public int ProductId { get; set; }

    public DateOnly StartDate { get; set; }

    public int ProductionStatusId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ProductionStatus ProductionStatus { get; set; } = null!;
}
