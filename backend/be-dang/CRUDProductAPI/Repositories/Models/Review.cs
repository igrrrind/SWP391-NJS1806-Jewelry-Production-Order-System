using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public int ProductId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public virtual Product Product { get; set; } = null!;
}
