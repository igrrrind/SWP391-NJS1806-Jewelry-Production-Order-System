using Repositories.Dto;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OrderRepository
    {
        JeweleryOrderProductionContext? _context;
        //GET
        public List<OrderDto> GetOders(OrderQueryObject queryObject)
        {
            _context = new JeweleryOrderProductionContext();
            // var temp = from order in _context.Orders
            //            join status in _context.Statuses
            //            on order.StatusId equals status.StatusId
            //            select new { order.OrderId, order.CustomerId, order.OrderDate, order.StatusId, status.StatusDetail, order.PaymentStatusId, order.IsShipment, order.IsCustom, order.OrderTotal };

            // var orderList = (from order in temp
            //                  join payment in _context.PaymentStatuses
            //                  on order.PaymentStatusId equals payment.PaymentStatusId
            //                  select new OrderDto() { OrderId = order.OrderId, CustomerId = order.CustomerId, OrderDate = order.OrderDate, StatusId = order.StatusId, StatusDetail = order.StatusDetail, PaymentStatusId = order.PaymentStatusId, PaymentStatusName = payment.StatusName, IsShipment = order.IsShipment, IsCustom = order.IsCustom, OrderTotal = order.OrderTotal }).AsQueryable();
            var orderList = (from o in _context.Orders
                            join s in _context.Statuses
                            on o.StatusId equals s.StatusId
                            join p in _context.PaymentStatuses
                            on o.PaymentStatusId equals p.PaymentStatusId
                            join c in _context.CustomerDetails
                            on o.CustomerId equals c.CustomerId
                            join u in _context.Users
                            on c.Uid equals u.Uid
                            select new OrderDto() {
                                OrderId = o.OrderId,
                                CustomerId = o.CustomerId,
                                OrderDate = o.OrderDate,
                                StatusId = o.StatusId,
                                StatusDetail = s.StatusDetail,
                                PaymentStatusId = o.PaymentStatusId,
                                PaymentStatusName = p.StatusName,
                                IsShipment = o.IsShipment,
                                IsCustom = o.IsCustom,
                                OrderTotal = o.OrderTotal,
                                FirstName = u.FirstName,
                                LastName = u.LastName,
                                Email = u.Email,
                                Phone = u.Phone
                            }).AsQueryable();
            if (queryObject.StatusId != 0)
            {
                orderList = orderList.Where(o => o.StatusId == queryObject.StatusId);
            }
            if (queryObject.OrderId != 0)
            {
                orderList = orderList.Where(o => o.OrderId == queryObject.OrderId);
            }
            if (queryObject.SortByNewer)
            {
                orderList = orderList.OrderByDescending(o => o.OrderId);
            }

            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;


            return orderList.Skip(skipNumber).Take(queryObject.PageSize).ToList();
        }
        public List<OrderDto> GetOrdersByCustomerId(OrderQueryObject queryObject, int customerId)
        {
            _context = new JeweleryOrderProductionContext();
            
            var orderList = (from o in _context.Orders
                            join s in _context.Statuses
                            on o.StatusId equals s.StatusId
                            join p in _context.PaymentStatuses
                            on o.PaymentStatusId equals p.PaymentStatusId
                            join c in _context.CustomerDetails
                            on o.CustomerId equals c.CustomerId
                            join u in _context.Users
                            on c.Uid equals u.Uid
                            select new OrderDto() {
                                OrderId = o.OrderId,
                                CustomerId = o.CustomerId,
                                OrderDate = o.OrderDate,
                                StatusId = o.StatusId,
                                StatusDetail = s.StatusDetail,
                                PaymentStatusId = o.PaymentStatusId,
                                PaymentStatusName = p.StatusName,
                                IsShipment = o.IsShipment,
                                IsCustom = o.IsCustom,
                                OrderTotal = o.OrderTotal,
                                FirstName = u.FirstName,
                                LastName = u.LastName,
                                Email = u.Email,
                                Phone = u.Phone
                            }).Where(o => o.CustomerId == customerId).AsQueryable();
            if (queryObject.StatusId != 0)
            {
                orderList = orderList.Where(o => o.StatusId == queryObject.StatusId);
            }
            if (queryObject.OrderId != 0)
            {
                orderList = orderList.Where(o => o.OrderId == queryObject.OrderId);
            }
            if (queryObject.SortByNewer)
            {
                orderList = orderList.OrderByDescending(o => o.OrderId);
            }

            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;


            return orderList.Skip(skipNumber).Take(queryObject.PageSize).ToList();
        }
        //POST
        public void AddNewOrder(Order order)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public CustomerDto GetCustomer(Order order)
        {
            UserRepository userRepository = new UserRepository();
            _context = new JeweleryOrderProductionContext();
            return userRepository.GetCustomerByCustomerId(order.CustomerId);
        }
        
        //DELETE
        public void DeleteOrdersById(int id)
        {
            _context = new JeweleryOrderProductionContext();
            var ordersToDelete = _context.Orders.Where(o => o.OrderId == id).ToList();
            _context.Orders.RemoveRange(ordersToDelete);
            _context.SaveChanges();
        }
        
        //PUT
        public void UpdateOrder(Order updatedOrder)
        {
            _context = new JeweleryOrderProductionContext();
            var existingOrder = _context.Orders.FirstOrDefault(o => o.OrderId == updatedOrder.OrderId);
            if (existingOrder != null)
            {
                existingOrder.CustomerId = updatedOrder.CustomerId;
                existingOrder.OrderDate = updatedOrder.OrderDate;
                existingOrder.StatusId = updatedOrder.StatusId;
                existingOrder.PaymentStatusId = updatedOrder.PaymentStatusId;
                existingOrder.IsShipment = updatedOrder.IsShipment;
                existingOrder.IsCustom = updatedOrder.IsCustom;
                existingOrder.OrderTotal = updatedOrder.OrderTotal;

                _context.SaveChanges();
            }
        }
        
    }
}
