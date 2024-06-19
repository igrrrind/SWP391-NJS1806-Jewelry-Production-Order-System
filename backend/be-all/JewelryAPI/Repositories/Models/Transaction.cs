using System;
using System.Collections.Generic;

namespace Repositories.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int OrderId { get; set; }

    public DateOnly TransactionDate { get; set; }

    public decimal TransactionTotal { get; set; }

    public string? PaymentType { get; set; }

    public bool IsDeposit { get; set; }

    public virtual Order Order { get; set; } = null!;
}
