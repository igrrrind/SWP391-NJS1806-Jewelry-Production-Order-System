using Repositories;
using Repositories.CustomizeObjects;
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
        public List<ViewStock>? GetAllStocksById(int id)
        {
            return _stockRepo.GetAllStocksById(id);
        }
    }
}
