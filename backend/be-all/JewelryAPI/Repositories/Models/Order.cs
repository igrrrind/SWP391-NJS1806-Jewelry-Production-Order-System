using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public DateOnly OrderDate { get; set; }

    public int StatusId { get; set; }

    public int PaymentStatusId { get; set; }

    public bool IsShipment { get; set; }

    public bool IsCustom { get; set; }

    public decimal OrderTotal { get; set; }

    public virtual CustomerDetail Customer { get; set; } = null!;

    public virtual ICollection<Design> Designs { get; set; } = new List<Design>();

    public virtual ICollection<OrderCustomItem> OrderCustomItems { get; set; } = new List<OrderCustomItem>();

    public virtual ICollection<OrderFixedItem> OrderFixedItems { get; set; } = new List<OrderFixedItem>();

    public virtual PaymentStatus PaymentStatus { get; set; } = null!;

    public virtual ICollection<ProductionTracking> ProductionTrackings { get; set; } = new List<ProductionTracking>();

    public virtual ICollection<Quote> Quotes { get; set; } = new List<Quote>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();

    public virtual Status Status { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
