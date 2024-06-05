using System;
using System.Collections.Generic;

namespace SWP.Models;

public partial class OrderFixedItem
{
    public int OrderFixedItemId { get; set; }

    public int OrderId { get; set; }

    public int ProductStockId { get; set; }

    public DateOnly OrderDate { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal Subtotal { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ProductStock ProductStock { get; set; } = null!;
}
