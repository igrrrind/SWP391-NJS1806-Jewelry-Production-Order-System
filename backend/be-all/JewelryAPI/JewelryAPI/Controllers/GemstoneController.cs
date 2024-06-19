using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class GemstoneController : Controller
    {
        [HttpGet]
        public IActionResult GetAllGemstones()
        {
            GemstoneService gemstoneService = new GemstoneService();
            var gemstonesList = gemstoneService.GetAllGemstones();
            if (gemstonesList == null)
            {
                return NotFound();
            }
            return Ok(gemstonesList);
        }
    }
}
