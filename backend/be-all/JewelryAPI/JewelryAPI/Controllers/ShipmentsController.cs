using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ShipmentsController : ControllerBase
    {
        private ShipmentService _context;

        public ShipmentsController(ShipmentService context)
        {
            _context = context;
        }

        // GET: api/Shipments
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Shipment>>> GetShipments()
        //{
        //    return await _context.Shipments.ToListAsync();
        //}

        // GET: api/Shipments/5
        [HttpGet("{id}")]
        public IActionResult GetShipment(int id)
        {
            var shipment = _context.GetShipment(id);
            return shipment == null ? NotFound() : Ok(shipment);
        }

        // PUT: api/Shipments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutShipment(int id, Shipment shipment)
        //{
        //    if (id != shipment.ShipmentId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(shipment).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ShipmentExists(id))
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

        // POST: api/Shipments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostShipment(Shipment shipment)
        {
            _context.AddShipment(shipment);

            return Ok(shipment);
        }

        // DELETE: api/Shipments/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteShipment(int id)
        //{
        //    var shipment = await _context.Shipments.FindAsync(id);
        //    if (shipment == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Shipments.Remove(shipment);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ShipmentExists(int id)
        //{
        //    return _context.Shipments.Any(e => e.ShipmentId == id);
        //}
    }
}
