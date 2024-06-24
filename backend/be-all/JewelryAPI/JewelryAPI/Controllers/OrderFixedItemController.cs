using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Repositories.QueryObjects;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class OrderFixedItemController : Controller
    {
        OrderFixedItemService _orderFixedItemService = new OrderFixedItemService();
        //ADD
        [HttpPost("AddNewOrderFixedItem")]
        public IActionResult AddNewOderFixedItem(OrderFixedItem orderFixedItem)
        {
           

           
                _orderFixedItemService.AddNewOrderFixedItem(orderFixedItem);
            
            return Ok(new {Data = orderFixedItem});
        }
        //GET
        [HttpGet]
        public IActionResult GetOrderFixedItems([FromQuery]OrderFixedItemQueryObject queryObject)
        {
            List<OrderFixedItem> fixedItemList = new List<OrderFixedItem>();
            try
            {
                fixedItemList = _orderFixedItemService.GetOrderFixedItems(queryObject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(fixedItemList);
        }
        //UPDATE
        [HttpPut("UpdateOrderFixedItem")]
        public IActionResult UpdateOrderFixedItem(OrderFixedItem orderFixedItem)
        {
            _orderFixedItemService.UpdateOrderFixedItem(orderFixedItem);
            return Ok(new {Data = orderFixedItem});
        }
        //DELETE
        [HttpDelete("DeleteOrderFixedItem")]
        public IActionResult DeleteOrderFixedItem(int OrderFixedItemId)
        {
            _orderFixedItemService.DeleteOrderFixedItem(OrderFixedItemId);
            return Ok(new {Success = true, Data="Delete Successfully"});
        }
    }
}
