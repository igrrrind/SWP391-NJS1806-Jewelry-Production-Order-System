using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWP.Interface;
using SWP1.Models;

namespace SWP1.Repositories
{
    public class OrderRepository : IOrder
    {
        private JeweleryOrderProduction1Context _dbContext;
        private readonly IMapper _mapper;

        public OrderRepository(JeweleryOrderProduction1Context dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public ICollection<Order> GetAllOrders()
        {

            return _dbContext.Orders.ToList();
        }

        public Order GetOrderById(int orderId)
        {
            return _dbContext.Orders.Where(O => O.OrderId == orderId).FirstOrDefault();
        }
    }
}
