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
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<ProductionTracking>>> GetProductionTrackings()
        //{
        //    return await _context.ProductionTrackings.ToListAsync();
        //}

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

        // PUT: api/ProductionTrackings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProductionTracking(int id, ProductionTracking productionTracking)
        //{
        //    if (id != productionTracking.ProductionId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(productionTracking).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductionTrackingExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/ProductionTrackings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostProductionTracking(ProductionTracking productionTracking)
        {
            _context.AddProductionTracking(productionTracking);
            return Ok(productionTracking);
        }
    }
}
