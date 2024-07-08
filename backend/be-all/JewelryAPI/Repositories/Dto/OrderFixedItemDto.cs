using System;
using System.Collections.Generic;
using Repositories.Models;

namespace Repositories.Dto;

public class OrderFixedItemDto
{
    public int OrderFixedItemId { get; set; }
    public int OrderId { get; set; }
    public int ProductStockId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Subtotal { get; set; }
    public string ProductName { get; set; } 
    
    public StockDto ProductStock { get; set; } 
}
