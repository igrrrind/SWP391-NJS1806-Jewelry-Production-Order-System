using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class ProductImage
{
    public int ProductImageId { get; set; }

    public int ProductStockId { get; set; }

    public string? ImageUrl { get; set; }

    public string? Alt { get; set; }

    public virtual ProductStock ProductStock { get; set; } = null!;
}
