using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public List<OrderFixedItem> GetOrderFixedItems(OrderFixedItemQueryObject queryObject)
        {
            _context = new JeweleryOrderProductionContext();
            var fixedItemList = _context.OrderFixedItems.AsQueryable();
            if(queryObject.OrderId != 0)
            {
                fixedItemList = fixedItemList.Where(f => f.OrderId == queryObject.OrderId);
            }

            if(queryObject.SortByNewer)
            {
                fixedItemList = fixedItemList.OrderByDescending(f => f.OrderFixedItemId);
            }

            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            return fixedItemList.Skip(skipNumber).Take(queryObject.PageSize).ToList();
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
