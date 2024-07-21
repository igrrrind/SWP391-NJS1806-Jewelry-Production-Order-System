using Repositories;
using Repositories.Dto;
using Repositories.Models;

namespace Services
{
    public class OrderCustomItemService
    {
        private OrderCustomItemRepository _repository;

        public List<OrderCustomItemDto> GetAllOrderCustomItems()
        {
            _repository = new OrderCustomItemRepository();
            return _repository.GetAllOrderCustomItems();
        }
        public OrderCustomItemDto GetOrderCustomItemByOrderId(int id)
        {
            _repository = new OrderCustomItemRepository();
            return _repository.GetOrderCustomItemByOrderId(id);
        }
        public OrderCustomItem AddOrderCustomItem(OrderCustomItem order)
        {
            _repository = new OrderCustomItemRepository();
            return _repository.AddOrderCustomItem(order);

        }

        public OrderCustomItem UpdateOrderCustomItem(int id, OrderCustomItem order)
        {
            _repository = new OrderCustomItemRepository();
            return _repository.UpdateOrderCustomItem(id, order);
        }
        public void DeleteOrderCustomItem(int id)
        {
            _repository = new OrderCustomItemRepository();
            _repository.DeleteOrderCustomItem(id);
        }

    }
}
