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
        [HttpGet("OrderCountByATimePeriod")]
        public IActionResult OrderCountByATimePeriod(DateOnly startDate, DateOnly endDate)
        {

            try
            {
                int orderCount = _orderService.OrderCountByATimePeriod(startDate, endDate);
                return Ok(orderCount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
          
        }
        [HttpGet("OrderCountByStatus")]
        public IActionResult OrderCountByStatus(int statusId)
        {
            try
            {
                int orderCount = _orderService.OrderCountByStatus(statusId);
                return Ok(orderCount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("TotalMoneyForEachMonth")]
        public IActionResult TotalMoneyForEachMonth(DateOnly year)
        {
            List<TotalMonth> totalMoneyList = new List<TotalMonth>();
            try
            {
                totalMoneyList = _orderService.TotalMoneyForEachMonth(year);
                return Ok(totalMoneyList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("TotalMoneyByYear")]
        public IActionResult TotalMoneyByYear(DateOnly year)
        {
            try
            {
                decimal totalMoney = _orderService.TotalMoneyByYear(year);
                return Ok(totalMoney);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
        
        
        [HttpDelete("{id}")]
        public IActionResult DeleteOrdersById(int id)
        {
            try
            {
                _orderService.DeleteOrderById(id);
                return Ok(new { message = "Orders deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] Order updatedOrder)
        {
            if (updatedOrder == null || updatedOrder.OrderId != id)
            {
                return BadRequest();
            }

            var existingOrder = _orderService.GetOrders(new OrderQueryObject { OrderId = id }).FirstOrDefault();
            if (existingOrder == null)
            {
                return NotFound();
            }

            try
            {
                _orderService.UpdateOrder(updatedOrder);
                return Ok(new { message = "Orders updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
