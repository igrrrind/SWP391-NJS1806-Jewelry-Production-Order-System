using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Repositories.CustomObjects;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductRepository
    {
        private JeweleryOrderProductionContext? _context = null;

        //GET
        public List<ViewProduct> GetAllProducts(ProductQueryObject productQuery)
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
            viewProductsList = viewProductsList.AsQueryable();
            
            if (productQuery.ProductTypeId != 0)
            {
                viewProductsList = viewProductsList.Where(p => p.ProductTypeId == productQuery.ProductTypeId);
            }

            if (!string.IsNullOrWhiteSpace(productQuery.SortBy))
            {
                if (productQuery.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    viewProductsList = productQuery.IsDecsending ? viewProductsList.OrderByDescending(p => p.ProductName) : viewProductsList.OrderBy(p => p.ProductName);
                }
            }

            var skipNumber = (productQuery.PageNumber - 1) * productQuery.PageSize;

            List<ViewProduct> returnList = viewProductsList.Skip(skipNumber).Take(productQuery.PageSize).ToList();
            



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
        //CREATE
        public void CreateProduct(Product product)
        {
            _context = new JeweleryOrderProductionContext();
            
            
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        //UPDATE
        public void UpdateProduct(Product product)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Products.Update(product);
            _context.SaveChanges();
        }

        

    }
}
