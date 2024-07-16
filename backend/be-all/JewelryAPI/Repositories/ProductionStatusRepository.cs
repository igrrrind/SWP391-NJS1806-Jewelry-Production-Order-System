using Repositories.Dto;
using Repositories.Models;

namespace Repositories
{
    public class ProductionStatusRepository
    {
        private JeweleryOrderProductionContext? _context = null;
        public ProductionStatusRepository() { }
        
        
        public List<ProductionStatus> GetAllProductionStatuses()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.ProductionStatuses.ToList();
            
        }
    }
}
