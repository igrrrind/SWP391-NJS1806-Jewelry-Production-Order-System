using Repositories.Models;

namespace Repositories
{
    public class OriginalProductTypeRepository
    {
        private JeweleryOrderProductionContext? _context = null;
        public List<ProductType> GetAllProductTypes()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.ProductTypes.ToList();
        }
    }
}
