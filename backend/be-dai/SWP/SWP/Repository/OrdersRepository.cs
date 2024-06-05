using SWP.Interface;
using SWP.Models;

namespace SWP.Repository
{
    public class OrdersRepository : IOrder
    {
        private JeweleryOrderproductionContext _dbContext;

        public OrdersRepository(JeweleryOrderproductionContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ICollection<Order> GetAllOrders()
        {
            _dbContext = new JeweleryOrderproductionContext();
            return _dbContext.Orders.ToList();
        }

        public Order GetOrderById(int orderId)
        {
            _dbContext = new JeweleryOrderproductionContext();
            return _dbContext.Orders.Where(o => o.OrderId == orderId).FirstOrDefault();
        }
    }
}
