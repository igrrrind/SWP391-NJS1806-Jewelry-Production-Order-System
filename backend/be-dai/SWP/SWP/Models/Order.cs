using System;
using System.Collections.Generic;

namespace SWP.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public DateOnly OrderDate { get; set; }

    public string OrderStatus { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public bool IsShipment { get; set; }

    public bool IsCustom { get; set; }

    public virtual CustomerDetail Customer { get; set; } = null!;

    public virtual ICollection<Design> Designs { get; set; } = new List<Design>();

    public virtual ICollection<OrderCustomItem> OrderCustomItems { get; set; } = new List<OrderCustomItem>();

    public virtual ICollection<OrderFixedItem> OrderFixedItems { get; set; } = new List<OrderFixedItem>();

    public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();

    public virtual Shipment? Shipment { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
