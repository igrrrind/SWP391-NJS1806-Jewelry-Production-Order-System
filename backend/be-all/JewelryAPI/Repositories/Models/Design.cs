using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Design
{
    public int DesignId { get; set; }

    public int OrderCustomId { get; set; }

    public int OrderId { get; set; }

    public string Description { get; set; } = null!;

    public DateOnly? DesignatedCompletion { get; set; }

    public bool IsCompleted { get; set; }

    public virtual ICollection<DesignImage> DesignImages { get; set; } = new List<DesignImage>();

    public virtual Order Order { get; set; } = null!;

    public virtual OrderCustomItem OrderCustom { get; set; } = null!;
}
