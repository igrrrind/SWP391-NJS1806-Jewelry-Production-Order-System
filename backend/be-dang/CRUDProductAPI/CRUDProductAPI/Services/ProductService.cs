using Repositories.CustomizeObjects;
using Repositories;
using Repositories.Models;

namespace Services
{
    public class ProductService
    {
        ProductRepository _ProductRepo = new ProductRepository();
        OriginalProductTypeRepository _originalProductTypeRepo = new OriginalProductTypeRepository();
        public List<ViewProduct> GetAllProduct()
        {
            return _ProductRepo.GetAllProducts();
        }

        public List<ViewProduct> GetAllActiveProduct()
        {
            return _ProductRepo.GetAllActiveProducts();
        }

        public ViewProduct? GetProductById(int id)
        {
            return _ProductRepo.GetProductById(id);
        }
        //CREATE
        public int CreateProduct(Product product)
        { 
            _ProductRepo.CreateProduct(product);
            return product.ProductId;
        }

        //UPDATE
        public void UpdateProduct(Product product) 
        {
            _ProductRepo.UpdateProduct(product);
        }


        //GET ALL PRODUCT TYPE
        public List<ProductType> GetAllProductTypes()
        {
            return _originalProductTypeRepo.GetAllProductTypes();
        }
    }
}
