using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Quote
{
    public int QuoteId { get; set; }

    public int OrderId { get; set; }

    public DateOnly CreatedDate { get; set; }

    public decimal? MetalWeight { get; set; }

    public decimal? MetalCost { get; set; }

    public decimal? CaratPrice { get; set; }

    public decimal? CaratCost { get; set; }

    public decimal? ProductionCost { get; set; }

    public decimal? QuoteTotalPrice { get; set; }

    public virtual Order Order { get; set; } = null!;
}
