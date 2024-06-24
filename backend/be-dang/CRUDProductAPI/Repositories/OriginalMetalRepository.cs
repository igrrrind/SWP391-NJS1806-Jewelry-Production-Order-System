using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OriginalMetalRepository
    {
        private JeweleryOrderProductionContext _context;
        public List<Metal> GetAllMetals()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.Metals.ToList();
        }
    }
}
