using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductionTrackingService
    {
        private ProductionTrackingRepository? repository = null;

        public ProductionTrackingService() { }

        public ProductionTracking? GetProductionTracking(int id)
        {
            repository = new ProductionTrackingRepository();
            return repository.GetProductionTracking(id);
        }
        public ProductionTracking AddProductionTracking(ProductionTracking tracking)
        {
            repository = new ProductionTrackingRepository();
            return repository.AddProductionTracking(tracking);
        }
    }
}
