using Repositories.Models;

namespace Repositories
{
    public class ProductionTrackingRepository
    {
        private JeweleryOrderProductionContext? _context = null;
        public ProductionTrackingRepository() { }
        public ProductionTracking? GetProductionTracking(int id)
        {
            _context = new JeweleryOrderProductionContext();
            return _context.ProductionTrackings.FirstOrDefault(t => t.OrderId == id);
        }

        public ProductionTracking AddProductionTracking(ProductionTracking tracking)
        {
            _context = new JeweleryOrderProductionContext();
            _context.ProductionTrackings.Add(tracking);
            _context.SaveChanges();
            return tracking;
        }

    }
}
