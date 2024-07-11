using System;
using System.Collections.Generic;

namespace Repositories.Dto;

public class OrderCustomItemDto
{
    public int OrderItemId { get; set; }

    public int OrderId { get; set; }

    public int ProductTypeId { get; set;}
    public string TypeName { get; set; }
    public int GemstoneId { get; set; }
    public string GemstoneType { get; set; }
    public string GemstoneColor { get; set; }
    public int MetalId { get; set; }
    public string MetalTypeName { get; set; }
    public int? Size { get; set; }
    public string RequestDescription { get; set; }
    public decimal UnitPrice { get; set; }

    public int? Quantity { get; set; }
    
    public bool DesignIsCompleted { get; set; }
    
    public decimal Subtotal { get; set; }
}
