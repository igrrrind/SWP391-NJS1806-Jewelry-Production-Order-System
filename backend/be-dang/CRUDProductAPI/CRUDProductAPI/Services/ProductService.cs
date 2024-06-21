using Repositories.CustomizeObjects;
using Repositories;
using Repositories.Models;
using Repositories.QueryObjects;

namespace Services
{
    public class ProductService
    {
        ProductRepository _ProductRepo = new ProductRepository();
        OriginalProductTypeRepository _originalProductTypeRepo = new OriginalProductTypeRepository();
        StockService _stockService = new StockService();
        public List<ViewProduct> GetAllProduct(ProductQueryObject productQuery)
        {
            return _ProductRepo.GetAllProducts(productQuery);
        }


        public ViewProduct? GetProductById(int id)
        {
            return _ProductRepo.GetProductById(id);
        }
        //CREATE
        public void CreateProduct(Product product)
        { 
            _ProductRepo.CreateProduct(product);
        }

        //UPDATE
        public void UpdateProduct(Product product) 
        {
            _ProductRepo.UpdateProduct(product);
        }
        //DELETE
        public void DeleteProduct(int id)
        {
            _ProductRepo.DeleteProduct(id);
        }

        //GET ALL PRODUCT TYPE
        public List<ProductType> GetAllProductTypes()
        {
            return _originalProductTypeRepo.GetAllProductTypes();
        }
    }
}
