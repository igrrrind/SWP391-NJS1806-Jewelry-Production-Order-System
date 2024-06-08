using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.CustomizeObjects;
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
        public IActionResult GetAllStocksById(int id)
        {
            List<ViewStock>? stocksList = _stockService.GetAllStocksById(id);
            if(stocksList == null)
            {
                return NotFound();
            }
            return Ok(stocksList);
        }
    }
}
