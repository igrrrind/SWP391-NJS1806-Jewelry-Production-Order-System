using System;
using System.Collections.Generic;

namespace SWP.Models;

public partial class Status
{
    public int StatusId { get; set; }

    public string StatusDetail { get; set; } = null!;
}
