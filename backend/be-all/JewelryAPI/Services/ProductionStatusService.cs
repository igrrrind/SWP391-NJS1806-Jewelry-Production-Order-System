using Repositories;
using Repositories.Models;

namespace Services;

public class ProductionStatusService
{
    private ProductionStatusRepository? productionStatusRepository = null;
        
        
    public List<ProductionStatus>? GetAllProductionStatuses()
    {
        productionStatusRepository = new ProductionStatusRepository();
        return productionStatusRepository.GetAllProductionStatuses();
    }
}