using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Shipment
{
    public int ShipmentId { get; set; }

    public int OrderId { get; set; }

    public DateOnly ShipmentDate { get; set; }

    public string ShippingAddress { get; set; } = null!;

    public string ShippingProvince { get; set; } = null!;

    public string ShippingDistrict { get; set; } = null!;

    public bool IsShipping { get; set; }

    public decimal ShippingFee { get; set; }

    public virtual Order Order { get; set; } = null!;
}
