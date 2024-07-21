using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.QueryObjects
{
    public class ProductQueryObject
    {
        public int? ProductTypeId { get; set; } = 0;
        public string? SearchKeyWord { get; set; } = null; 
        public bool IsActive { get; set; } = false; 
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
