using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ProductionTrackingsController : ControllerBase
    {
        private readonly ProductionTrackingService _context;

        public ProductionTrackingsController(ProductionTrackingService context)
        {
            _context = context;
        }

        // GET: api/ProductionTrackings
        [HttpGet]
        public IActionResult GetProductionTrackings()
        {
            var productionTrackings = _context.GetAllProductionTracking();

            if (productionTrackings == null)
            {
                return NotFound();
            }

            return Ok(productionTrackings);
        }

        // GET: api/ProductionTrackings/5
        [HttpGet("{id}")]
        public IActionResult GetProductionTracking(int id)
        {
            var productionTracking = _context.GetProductionTracking(id);

            if (productionTracking == null)
            {
                return NotFound();
            }

            return Ok(productionTracking);
        }
        [HttpGet("CountByProductionStatusId")]
        public IActionResult CountProductionStatusId(int id)
        {
            var count = _context.GetProductionTrackingCount(id);
            return Ok(count);
        }


        // PUT: api/ProductionTrackings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductionTracking(ProductionTracking tracking)
        {
            try
            {
                ProductionTracking trackingReturn =  _context.UpdateProductionTracking(tracking);
                return Ok(trackingReturn);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/ProductionTrackings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostProductionTracking(ProductionTracking productionTracking)
        {
            _context.AddProductionTracking(productionTracking);
            return Ok(productionTracking);
        }

        // DELETE: api/ProductionTrackings/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProductionTracking(int id)
        //{
        //    var productionTracking = await _context.ProductionTrackings.FindAsync(id);
        //    if (productionTracking == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ProductionTrackings.Remove(productionTracking);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProductionTrackingExists(int id)
        //{
        //    return _context.ProductionTrackings.Any(e => e.ProductionId == id);
        //}
    }
}
