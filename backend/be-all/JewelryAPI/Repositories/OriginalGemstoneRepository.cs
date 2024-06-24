using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OriginalGemstoneRepository
    {
        private JeweleryOrderProductionContext _context = null;

        public List<Gemstone> GetAllGemstones()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.Gemstones.ToList();
        }

    }
}
