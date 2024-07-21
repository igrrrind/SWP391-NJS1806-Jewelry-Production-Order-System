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
        public int OrderCountByATimePeriod(DateOnly startDate, DateOnly endDate) => _orderRepo.OrderCountByATime(startDate, endDate);
        public int OrderCountByStatus(int statusId) => _orderRepo.OrderCountByStatus(statusId);
        public List<TotalMonth> TotalMoneyForEachMonth(DateOnly year) => _orderRepo.TotalMoneyForEachMonth(year);
        public decimal TotalMoneyByYear(DateOnly year) => _orderRepo.TotalMoneyByYear(year);
        public void AddNewOrder(Order order) => _orderRepo.AddNewOrder(order);
        
        public void UpdateOrder(Order order) => _orderRepo.UpdateOrder(order);
        
        public void DeleteOrderById(int id) => _orderRepo.DeleteOrdersById(id);
        
        public CustomerDto GetCustomer(Order order) => _orderRepo.GetCustomer(order);

        public List<OrderDto> GetOrdersByCustomerId(OrderQueryObject queryObject, int customerId) 
            => _orderRepo.GetOrdersByCustomerId(queryObject, customerId);
    }
}
