using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class CustomerDetailsController : ControllerBase
    {
        private readonly CustomerDetailService _context;

        public CustomerDetailsController(CustomerDetailService context)
        {
            _context = context;
        }

        // GET: api/CustomerDetails
        //[HttpGet]
        //public IActionResult GetCustomerDetails()
        //{
        //    return NoContent();
        //}

        // GET: api/CustomerDetails/5
        [HttpGet("{id}")]
        public IActionResult GetCustomerDetail(string id)
        {
            CustomerDetail customerDetail = _context.GetDetailByUid(id);
            return customerDetail == null ? NotFound() : Ok(customerDetail);    
            

        }

        // PUT: api/CustomerDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerDetail(string id, CustomerDetail customerDetail)
        {
            if (id != customerDetail.Uid)
            {
                return BadRequest();
            }
            _context.UpdateDetail(id, customerDetail);
            return NoContent();

        }

        // POST: api/CustomerDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerDetail>> PostCustomerDetail(CustomerDetail customerDetail)
        {
            _context.AddCustomerDetail(customerDetail);
            return Ok(customerDetail);
        }

        // DELETE: api/CustomerDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerDetail(string id)
        {
            var customerDetail = _context.GetDetailByUid(id);
            if (customerDetail == null)
            {
                return NotFound();
            }

            _context.DeleteCustomerDetail(id);

            return NoContent();
        }

        //private bool CustomerDetailExists(int id)
        //{
        //    return _context.CustomerDetails.Any(e => e.CustomerId == id);
        //}
    }
}
