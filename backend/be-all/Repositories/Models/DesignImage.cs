using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class DesignImage
{
    public int DesignImageId { get; set; }

    public int DesignId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual Design Design { get; set; } = null!;
}
