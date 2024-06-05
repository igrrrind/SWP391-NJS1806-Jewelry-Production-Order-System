using Repositories.CustomizeObjects;
using Repositories;

namespace Services
{
    public class ProductService
    {
        ProductRepository viewProductRepo = new ProductRepository();
        public List<ViewProduct> GetAllProduct()
        {
            return viewProductRepo.GetAllProducts();
        }

        public List<ViewProduct> GetAllActiveProduct()
        {
            return viewProductRepo.GetAllActiveProducts();
        }

        public ViewProduct? GetProductById(int id)
        {
            return viewProductRepo.GetProductById(id);
        }
    }
}
