using Microsoft.EntityFrameworkCore;
using Repositories.CustomizeObjects;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductRepository
    {
        private JeweleryOrderProductionContext _context = null;

        //GET
        public List<ViewProduct> GetAllProducts()
        {
            _context = new JeweleryOrderProductionContext();
            var viewProductsList = from p in _context.Products
                                   join t in _context.ProductTypes
                                   on p.ProductTypeId equals t.ProductTypeId
                                   select new ViewProduct()
                                   {
                                       ProductId = p.ProductId,
                                       ProductTypeId = p.ProductTypeId,
                                       ProductType = t.TypeName,
                                       ProductName = p.ProductName,
                                       ProductDescription = p.ProductDescription,
                                       IsActive = p.IsActive
                                   };
            List<ViewProduct> returnList = viewProductsList.ToList();
            

            return returnList;
            
        }

        public List<ViewProduct> GetAllActiveProducts()
        {
            _context = new JeweleryOrderProductionContext();
            var viewProductsList = from p in _context.Products
                                   join t in _context.ProductTypes
                                   on p.ProductTypeId equals t.ProductTypeId
                                   where p.IsActive == true
                                   select new ViewProduct()
                                   {
                                       ProductId = p.ProductId,
                                       ProductTypeId = p.ProductTypeId,
                                       ProductType = t.TypeName,
                                       ProductName = p.ProductName,
                                       ProductDescription = p.ProductDescription,
                                       IsActive = p.IsActive
                                   };
            List<ViewProduct> returnList = viewProductsList.ToList();


            return returnList;

        }

        public ViewProduct? GetProductById(int productId)
        {
            _context = new JeweleryOrderProductionContext();
            var viewProduct = (from p in _context.Products
                              join t in _context.ProductTypes
                              on p.ProductTypeId equals t.ProductTypeId
                              where(p.ProductId == productId) 
                              select new ViewProduct()
                              {
                                  ProductId = p.ProductId,
                                  ProductTypeId = p.ProductTypeId,
                                  ProductType = t.TypeName,
                                  ProductName = p.ProductName,
                                  ProductDescription = p.ProductDescription,
                                  IsActive = p.IsActive
                              }).FirstOrDefault();

            //context.Products.FirstOrDefault(p => p.ProductId == productId);
            
            return viewProduct;
        }


        

    }
}
