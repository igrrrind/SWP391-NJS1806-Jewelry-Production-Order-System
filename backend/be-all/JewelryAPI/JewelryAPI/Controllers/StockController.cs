using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.CustomObjects;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class StockController : Controller
    {
        StockService _stockService = new();
        [HttpGet("{id}")]
        public IActionResult GetAllStocksByProductId(int id)
        {
            List<ViewStock>? stocksList = _stockService.GetAllStocksByProductId(id);
            if(stocksList == null)
            {
                return NotFound();
            }
            return Ok(stocksList);
        }

        [HttpPut("Update")]
        public IActionResult UpdateProductStock(ProductStock productStock) 
        {
            try
            {
                _stockService.UpdateProductStock(productStock);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            return Ok(new {Success = true, Data = productStock});
            
        }
    }
}
