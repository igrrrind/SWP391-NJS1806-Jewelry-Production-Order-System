using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Dto;
using Repositories.Models;
using Services;

namespace CRUDProductAPI.Controllers
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
            List<StockDto>? stocksList = _stockService.GetAllStocksByProductId(id);
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

        //ADD NEW STOCK
        [HttpPost("AddNewStockItem")]
        public IActionResult AddNewProductStock(ProductStock productStock)
        {
            try
            {
                _stockService.AddNewProductStock(productStock);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new {Success = true, Data = productStock });
        }
        //DELETE
        [HttpPut("DeleteStockItem")]
        public IActionResult DeleteProductStock(int id)
        {
            try
            {
                _stockService.DeleteProductStock(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { Success = true, Data = "Delete Successfully" });
        }
    }
}
