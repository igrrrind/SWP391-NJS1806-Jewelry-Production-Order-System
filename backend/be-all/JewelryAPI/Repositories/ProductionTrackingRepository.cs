using Repositories.Dto;
using Repositories.Models;

namespace Repositories
{
    public class ProductionTrackingRepository
    {
        private JeweleryOrderProductionContext? _context = null;
        public ProductionTrackingRepository() { }
        
        
        public List<ProductionTrackingDto> GetAllProductionTrackings()
        {
            using (var context = new JeweleryOrderProductionContext())
            {
                // Fetch all production tracking entities
                var trackings = context.ProductionTrackings.ToList();

                // Fetch all production statuses to minimize database calls
                var productionStatuses = context.ProductionStatuses.ToDictionary(s => s.ProductionStatusId);

                // Map to ProductionTrackingDto
                var trackingDtos = trackings.Select(tracking => new ProductionTrackingDto
                {
                    ProductionId = tracking.ProductionId,
                    OrderId = tracking.OrderId,
                    StartDate = tracking.StartDate,
                    ProductionStatusId = tracking.ProductionStatusId,
                    ProductionStatusName = productionStatuses.TryGetValue(tracking.ProductionStatusId, out var status) ? status.StatusName : null
                }).ToList();

                return trackingDtos;
            }
        }
        public int CountProductionStatusId(int id)
        {
            _context = new JeweleryOrderProductionContext();
            return _context.ProductionTrackings.Where(t => t.ProductionStatusId == id).Count();

        }
        
        
        
        public ProductionTrackingDto? GetProductionTracking(int id)
        {
            _context = new JeweleryOrderProductionContext();
            var tracking = _context.ProductionTrackings.FirstOrDefault(t => t.OrderId == id);

            if (tracking == null)
            {
                return null; 
            }

            var productionStatus = _context.ProductionStatuses.FirstOrDefault(s => s.ProductionStatusId == tracking.ProductionStatusId);

            // Map to ProductionTrackingDto
            var trackingDto = new ProductionTrackingDto
            {
                ProductionId = tracking.ProductionId,
                OrderId = tracking.OrderId,
                StartDate = tracking.StartDate,
                ProductionStatusId = tracking.ProductionStatusId,
                ProductionStatusName = productionStatus?.StatusName 
            };

            return trackingDto;
        }

        public ProductionTracking AddProductionTracking(ProductionTracking tracking)
        {
            _context = new JeweleryOrderProductionContext();
            _context.ProductionTrackings.Add(tracking);
            _context.SaveChanges();
            return tracking;
        }
        
        public ProductionTracking UpdateProductionTracking(ProductionTracking tracking)
        {
            _context = new JeweleryOrderProductionContext();
            _context.ProductionTrackings.Update(tracking);
            _context.SaveChanges();

            return tracking;
        }

    }
}
