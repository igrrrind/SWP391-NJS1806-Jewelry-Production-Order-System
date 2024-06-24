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
            var temp = from order in _context.Orders
                            join status in _context.Statuses
                            on order.StatusId equals status.StatusId
                            select new { order.OrderId, order.CustomerId, order.OrderDate, order.StatusId, status.StatusDetail, order.PaymentStatusId, order.IsShipment, order.IsCustom, order.OrderTotal };

            var orderList = (from order in temp
                            join payment in _context.PaymentStatuses
                            on order.PaymentStatusId equals payment.PaymentStatusId
                            select new OrderDto() { OrderId = order.OrderId, CustomerId = order.CustomerId, OrderDate = order.OrderDate, StatusId = order.StatusId, StatusDetail = order.StatusDetail, PaymentStatusId = order.PaymentStatusId, PaymentStatusName = payment.StatusName, IsShipment = order.IsShipment, IsCustom = order.IsCustom, OrderTotal = order.OrderTotal }).AsQueryable();
            if(queryObject.StatusId != 0)
            {
                orderList = orderList.Where(o => o.StatusId == queryObject.StatusId);
            }
            if(queryObject.OrderId != 0)
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
    }
}
