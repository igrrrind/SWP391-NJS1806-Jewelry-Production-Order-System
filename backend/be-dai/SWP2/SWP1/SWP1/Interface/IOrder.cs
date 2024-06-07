
using SWP1.Models;

namespace SWP.Interface
{
    public interface IOrder
    {
        ICollection<Order>GetAllOrders();
        Order GetOrderById(int orderId);

    }
}
