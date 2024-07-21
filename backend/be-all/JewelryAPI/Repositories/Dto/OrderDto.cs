using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        public int CustomerId { get; set; }

        public DateOnly OrderDate { get; set; }

        public int StatusId { get; set; }
        public string StatusDetail { get; set; } = null!;

        public int PaymentStatusId { get; set; }
        public string PaymentStatusName { get; set; } = null!;

        public bool IsShipment { get; set; }

        public bool IsCustom { get; set; }

        public decimal OrderTotal { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
