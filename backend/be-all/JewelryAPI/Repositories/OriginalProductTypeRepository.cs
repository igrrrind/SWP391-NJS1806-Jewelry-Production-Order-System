using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OriginalProductTypeRepository
    {
        JeweleryOrderProductionContext _context;
        public List<ProductType> GetAllProductTypes()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.ProductTypes.ToList();
        }
    }
}
