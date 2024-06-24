using Microsoft.EntityFrameworkCore;
using Repositories.Models;

namespace Repositories
{
    public class OriginalProductRepository
    {
        private JeweleryOrderProductionContext context = null;

        //ADD NEW PRODUCT & STOCK (ALREADY HAVE THINGS LIKE METALS, GEMSTONE,....)
        public void AddProduct(Product product) 
        {
            
            context = new();
            context.Products.Add(product);
            context.SaveChanges();
        }

        public void AddProductStock(ProductStock productStock)
        {
            context = new();
            context.ProductStocks.Add(productStock);
            context.SaveChanges();
        }

        public void AddProductImage(ProductImage productImage)
        {
            context= new();
            context.ProductImages.Add(productImage);
            context.SaveChanges();
            
        }

        



        
    }
}
