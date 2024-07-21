using Repositories;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repositories.Dto;

namespace Services
{
    public class OrderFixedItemService
    {
        private OrderFixedItemRepository _orderFixedItemRepo = new OrderFixedItemRepository();
        //ADD
        public void AddNewOrderFixedItem(OrderFixedItem orderFixedItem)
        {
            _orderFixedItemRepo.AddNewOrderFixedItem(orderFixedItem);
        }
        //GET
        public List<OrderFixedItemDto> GetOrderFixedItems(OrderFixedItemQueryObject queryObject) => _orderFixedItemRepo.GetOrderFixedItems(queryObject);
        public int SumQuantityByOrderId(int OrderId) => _orderFixedItemRepo.SumOfQuantiTyByProductId(OrderId);
        public List<SaleProductDto> TopSaleProduct(OrderFixedItemQueryObject obj) => _orderFixedItemRepo.TopSaleProductList(obj);
        //UPDATE
        public void UpdateOrderFixedItem(OrderFixedItem orderFixedItem) => _orderFixedItemRepo.UpdateOrderFixedItem(orderFixedItem);
        //DELETE
        public void DeleteOrderFixedItem(int OrderFixedItemId) => _orderFixedItemRepo.DeleteOrderFixedItem(OrderFixedItemId);
    }
}
