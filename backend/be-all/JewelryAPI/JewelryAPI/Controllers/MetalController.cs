using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class MetalController : Controller
    {
        [HttpGet]
        public IActionResult GetAllMetals()
        {
            MetalService services = new MetalService();
            List<Metal> metals= services.GetAllMetals();
            if(metals == null)
            {
                return NotFound();
            }
            return Ok(metals);
        }

    }
}
