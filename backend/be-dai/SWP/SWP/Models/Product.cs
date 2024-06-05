using System;
using System.Collections.Generic;

namespace SWP.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int ProductTypeId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? ProductDescription { get; set; }

    public bool InStock { get; set; }

    public virtual ICollection<ProductStock> ProductStocks { get; set; } = new List<ProductStock>();

    public virtual ProductType ProductType { get; set; } = null!;

    public virtual ICollection<ProductionTracking> ProductionTrackings { get; set; } = new List<ProductionTracking>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
