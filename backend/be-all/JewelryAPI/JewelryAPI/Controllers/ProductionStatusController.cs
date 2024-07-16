using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ProductionStatusController : ControllerBase
    {
        private readonly ProductionStatusService _context;

        public ProductionStatusController(ProductionStatusService context)
        {
            _context = context;
        }

        // GET: api/ProductionStatus
        [HttpGet]
        public IActionResult GetProductionStatuses()
        {
            var productionStatusList = _context.GetAllProductionStatuses();

            if (productionStatusList == null)
            {
                return NotFound();
            }

            return Ok(productionStatusList);
        }
    }
}
