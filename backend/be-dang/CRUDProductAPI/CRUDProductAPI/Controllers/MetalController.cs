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
