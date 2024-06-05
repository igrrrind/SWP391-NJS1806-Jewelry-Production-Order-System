using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Metal
{
    public int MetalId { get; set; }

    public string MetalTypeName { get; set; } = null!;

    public virtual ICollection<OrderCustomItem> OrderCustomItems { get; set; } = new List<OrderCustomItem>();

    public virtual ICollection<ProductStock> ProductStocks { get; set; } = new List<ProductStock>();
}
