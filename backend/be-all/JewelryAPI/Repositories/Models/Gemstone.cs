using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Gemstone
{
    public int GemstoneId { get; set; }

    public string GemstoneType { get; set; } = null!;

    public int GemstoneCarat { get; set; }

    public string? Color { get; set; }

    public virtual ICollection<OrderCustomItem> OrderCustomItems { get; set; } = new List<OrderCustomItem>();

    public virtual ICollection<ProductStock> ProductStocks { get; set; } = new List<ProductStock>();
}
