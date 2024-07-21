using Repositories;
using Repositories.Dto;
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
        public List<StockDto>? GetAllStocksByProductId(int id)
        {
            return _stockRepo.GetAllStocksByProductId(id);
        }

        //UPDATE
        public void UpdateProductStock(ProductStock productStock)
        {
            _stockRepo.UpdateProductStock(productStock);
        }
        //ADD
        public void AddNewProductStock(ProductStock productStock)
        {
            _stockRepo.AddNewProductStock(productStock);
        }
        //DELETE
        public void DeleteProductStock(int id)
        {
            _stockRepo.DeleteProductStock(id);
        }
        public void DeleteProductStockByProductId(int id)
        {
            _stockRepo.DeleteProductStockByProductId(id);
        }

    }
}
