using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class OrderCustomItemsController : ControllerBase
    {
        private OrderCustomItemService _service;

        public OrderCustomItemsController(OrderCustomItemService context)
        {
            _service = context;
        }

        [HttpGet]
        public IActionResult GetOrderCustomItems()
        {
            if (_service.GetAllOrderCustomItems() == null)
            {

                return NotFound();
            }
            return Ok(_service.GetAllOrderCustomItems());
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderCustomItemByOrderId(int orderId)
        {
            var orderCustomItemList = _service.GetAllOrderCustomItems();

            if (orderCustomItemList == null)
            {
                return NotFound();
            }
            if (_service.GetOrderCustomItemByOrderId(orderId) == null)
            {
                return NotFound();
            }
            return Ok(_service.GetOrderCustomItemByOrderId(orderId));
        }

        [HttpPut("{id}")]
        public IActionResult PutOrderCustomItem(int id, OrderCustomItem orderCustomItem)
        {
            if (id != orderCustomItem.OrderItemId)
            {
                return BadRequest();
            }
            if (orderCustomItem == null)
            {
                return BadRequest();
            }

            _service.UpdateOrderCustomItem(id, orderCustomItem);
            return Ok(orderCustomItem);
        }

        [HttpPost]
        public IActionResult PostOrderCustomItem(OrderCustomItem orderCustomItem)
        {
            _service.AddOrderCustomItem(orderCustomItem);
            return Ok(orderCustomItem);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrderCustomItem(int id)
        {
            _service.DeleteOrderCustomItem(id);

            return NoContent();
        }
    }
}
