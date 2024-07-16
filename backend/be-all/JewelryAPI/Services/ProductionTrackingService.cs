using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repositories.Dto;

namespace Services
{
    public class ProductionTrackingService
    {
        private ProductionTrackingRepository? productionTrackingRepository = null;
        
        
        public List<ProductionTrackingDto>? GetAllProductionTracking()
        {
            productionTrackingRepository = new ProductionTrackingRepository();
            return productionTrackingRepository.GetAllProductionTrackings();
        }

    
        public ProductionTrackingDto? GetProductionTracking(int id)
        {
            productionTrackingRepository = new ProductionTrackingRepository();
            return productionTrackingRepository.GetProductionTracking(id);
        }
        public ProductionTracking AddProductionTracking(ProductionTracking tracking)
        {
            productionTrackingRepository = new ProductionTrackingRepository();
            return productionTrackingRepository.AddProductionTracking(tracking);
        }
        
        public ProductionTracking UpdateProductionTracking(ProductionTracking tracking)
        {
            productionTrackingRepository = new ProductionTrackingRepository();
            return productionTrackingRepository.UpdateProductionTracking(tracking);
        }
    }
}
