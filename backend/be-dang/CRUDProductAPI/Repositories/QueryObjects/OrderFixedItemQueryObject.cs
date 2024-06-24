using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.QueryObjects
{
    public class OrderFixedItemQueryObject
    {
        public int OrderId { get; set; } = 0;
        public bool SortByNewer { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
