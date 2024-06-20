using Repositories.CustomObjects;
using Repositories.Models;

namespace Repositories
{
    public class StockRepository
    {
        private JeweleryOrderProductionContext? _context = null;
        private OriginalGemstoneRepository _gemstoneRepo = new();
        public List<ViewStock>? GetAllStocksByProductId(int id)
        {
            _context = new JeweleryOrderProductionContext();
            var stocksList = from s in _context.ProductStocks
                             join m in _context.Metals
                             on s.MetalId equals m.MetalId
                             where s.ProductId == id
                             select new ViewStock()
                             {
                                 ProductStockId = s.ProductStockId,
                                 ProductId = s.ProductId,
                                 GemstoneId = s.GemstoneId,
                                 MetalId = s.MetalId,
                                 MetalTypeName = m.MetalTypeName,
                                 Size = s.Size,
                                 StockQuantity = s.StockQuantity,
                                 Price = s.Price,
                                 GalleryUrl = s.GalleryUrl
                             };
            List<ViewStock> returnList = stocksList.ToList();

            List<Gemstone> gemstonesList = _gemstoneRepo.GetAllGemstones();

            returnList.ForEach(stock => {
                Gemstone gemstone = gemstonesList.First(gemstone => gemstone.GemstoneId == stock.GemstoneId);
                stock.GemstoneType = gemstone.GemstoneType;
                stock.GemstoneColor = gemstone.Color;
            
            });
            return returnList;                

        }

        //UPDATE
        public void UpdateProductStock(ProductStock productStock)
        {
            _context = new JeweleryOrderProductionContext();
            _context.ProductStocks.Update(productStock);
            _context.SaveChanges();
        }
    }
}
