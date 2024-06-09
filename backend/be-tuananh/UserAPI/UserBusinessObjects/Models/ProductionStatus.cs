using System;
using System.Collections.Generic;

namespace UserBusinessObjects.Models;

public partial class ProductionStatus
{
    public int ProductionStatusId { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<ProductionTracking> ProductionTrackings { get; set; } = new List<ProductionTracking>();
}
