using Repositories;
using Repositories.CustomObjects;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class StockService
    {
        private StockRepository _stockRepo = new StockRepository();
        public List<ViewStock>? GetAllStocksByProductId(int id)
        {
            return _stockRepo.GetAllStocksByProductId(id);
        }

        //UPDATE
        public void UpdateProductStock(ProductStock productStock)
        {
            _stockRepo.UpdateProductStock(productStock);
        }
    }
}
