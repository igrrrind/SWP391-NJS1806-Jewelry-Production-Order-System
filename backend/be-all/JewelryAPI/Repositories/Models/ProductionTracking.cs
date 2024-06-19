using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class ProductionTracking
{
    public int ProductionId { get; set; }

    public int OrderId { get; set; }

    public DateOnly StartDate { get; set; }

    public int ProductionStatusId { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ProductionStatus ProductionStatus { get; set; } = null!;
}
