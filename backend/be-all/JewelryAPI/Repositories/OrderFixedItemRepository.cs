using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Dto;

namespace Repositories
{
    public class OrderFixedItemRepository
    {
        private JeweleryOrderProductionContext? _context;
        //ADD
        public void AddNewOrderFixedItem(OrderFixedItem orderFixedItem)
        {
            _context = new JeweleryOrderProductionContext();
            _context.OrderFixedItems.Add(orderFixedItem);
            _context.SaveChanges();
        }
        //GET
        public List<OrderFixedItemDto> GetOrderFixedItems(OrderFixedItemQueryObject queryObject)
        {
            _context = new JeweleryOrderProductionContext();
            
            var list = from ofi in _context.OrderFixedItems
                join p in _context.Products on ofi.ProductId equals p.ProductId
                join ps in _context.ProductStocks on ofi.ProductStockId equals ps.ProductStockId
                join g in _context.Gemstones on ps.GemstoneId equals g.GemstoneId
                join m in _context.Metals on ps.MetalId equals m.MetalId
                select new OrderFixedItemDto
                {
                    OrderFixedItemId = ofi.OrderFixedItemId,
                    OrderId = ofi.OrderId,
                    ProductStockId = ofi.ProductStockId,
                    ProductId = ofi.ProductId,
                    Quantity = ofi.Quantity,
                    UnitPrice = ofi.UnitPrice,
                    Subtotal = ofi.Subtotal,
                    ProductName = p.ProductName,
                    ProductStock = new StockDto
                    {
                        ProductStockId = ps.ProductStockId,
                        ProductId = ps.ProductId,
                        GemstoneId = ps.GemstoneId,
                        GemstoneType = g.GemstoneType,
                        GemstoneColor = g.Color,
                        MetalId = ps.MetalId,
                        MetalTypeName = m.MetalTypeName,
                        Size = ps.Size,
                        StockQuantity = ps.StockQuantity,
                        Price = ps.Price,
                        GalleryUrl = ps.GalleryUrl
                    }
                };

            if (queryObject.OrderId != 0)
            {
                list = list.Where(f => f.OrderId == queryObject.OrderId);
            }

            if (queryObject.SortByNewer)
            {
                list = list.OrderByDescending(f => f.OrderFixedItemId);
            }

            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            return list.Skip(skipNumber).Take(queryObject.PageSize).ToList();
        }

        
        //UPDATE
        public void UpdateOrderFixedItem(OrderFixedItem orderFixedItem)
        {
            _context = new JeweleryOrderProductionContext();
            _context.OrderFixedItems.Update(orderFixedItem);
            _context.SaveChanges();
        }
        //DELETE
        public void DeleteOrderFixedItem(int OrderFixedItemId)
        {
            _context = new JeweleryOrderProductionContext();
            OrderFixedItem orderFixedItem = new OrderFixedItem() { OrderFixedItemId = OrderFixedItemId};
            _context.OrderFixedItems.Remove(orderFixedItem);
            _context.SaveChanges();
        }
    }
}
