using Repositories;
using Repositories.Dto;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService
    {
        private OrderRepository _orderRepo = new OrderRepository();
        public List<OrderDto> GetOrders(OrderQueryObject queryObject) => _orderRepo.GetOders(queryObject);
       
        public void AddNewOrder(Order order) => _orderRepo.AddNewOrder(order);
    }
}
