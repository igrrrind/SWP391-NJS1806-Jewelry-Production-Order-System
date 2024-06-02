using Repositories.CustomizeObjects;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ViewProductRepository
    {
        private JeweleryOrderProductionContext context = null;
        public List<ViewProduct> GetAllViewProducts()
        {
            context = new JeweleryOrderProductionContext();
            var viewProductsList = from p in context.Products
                                   join t in context.ProductTypes
                                   on p.ProductTypeId equals t.ProductTypeId
                                   select new ViewProduct()
                                   {
                                       ProductId = p.ProductId,
                                       ProductTypeId = p.ProductTypeId,
                                       ProductType = t.TypeName,
                                       ProductName = p.ProductName,
                                       ProductDescription = p.ProductDescription,
                                       InStock = p.InStock
                                   };
            List<ViewProduct> returnList = viewProductsList.ToList();

            return returnList;
            
        }


    }
}
