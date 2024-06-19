using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class ProductStock
{
    public int ProductStockId { get; set; }

    public int ProductId { get; set; }

    public int GemstoneId { get; set; }

    public int MetalId { get; set; }

    public int? Size { get; set; }

    public int? StockQuantity { get; set; }

    public decimal Price { get; set; }

    public string? GalleryUrl { get; set; }

    public virtual Gemstone Gemstone { get; set; } = null!;

    public virtual Metal Metal { get; set; } = null!;

    public virtual ICollection<OrderFixedItem> OrderFixedItems { get; set; } = new List<OrderFixedItem>();

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
}
