using System;
using System.Collections.Generic;

namespace SWP1.Models;

public partial class RequestImage
{
    public int RequestImageId { get; set; }

    public int OrderCustomId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual OrderCustomItem OrderCustom { get; set; } = null!;
}
