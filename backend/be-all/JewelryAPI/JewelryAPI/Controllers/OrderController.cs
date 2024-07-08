using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Dto;
using Repositories.Models;
using Repositories.QueryObjects;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class OrderController : Controller
    {
        OrderService _orderService = new();
        [HttpGet]
        public IActionResult GetOrders([FromQuery] OrderQueryObject queryObject)
        {
            List<OrderDto> orderList = new List<OrderDto>();
            try
            {
                orderList = _orderService.GetOrders(queryObject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(orderList);
        }
        [HttpGet("{customerId}")]
        public IActionResult GetOrdersByCustomerId([FromQuery] OrderQueryObject queryObject, int customerId)
        {
            List<OrderDto> orderList = new List<OrderDto>();
            try
            {
                orderList = _orderService.GetOrdersByCustomerId(queryObject, customerId);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok(orderList);
        }
        [HttpPost("AddNewOrder")]
        public IActionResult AddNewOrder(Order order)
        {
            try
            {
                _orderService.AddNewOrder(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { Data = order });
        }
        
        
        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrdersById(int orderId)
        {
            try
            {
                _orderService.DeleteOrderById(orderId);
                return Ok(new { message = "Orders deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
