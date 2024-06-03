using Repositories;
using Repositories.CustomizeObjects;

namespace Services
{
    public class ProductServices
    {
        ViewProductRepository viewProductRepo = new ViewProductRepository();
        public List<ViewProduct> GetAllProduct()
        {
            return viewProductRepo.GetAllViewProducts();
        }
    }
}
