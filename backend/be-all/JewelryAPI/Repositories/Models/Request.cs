using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Request
{
    public int RequestId { get; set; }

    public int OrderId { get; set; }

    public int? OrderCustomId { get; set; }

    public string RequestDescription { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual OrderCustomItem? OrderCustom { get; set; }
}
