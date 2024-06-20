using Microsoft.AspNetCore.Mvc;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("AllowAll")]

    public class QuotesController : ControllerBase
    {
        private QuoteService _context;

        public QuotesController(QuoteService context)
        {
            _context = context;
        }

        // GET: api/Quotes
        [HttpGet]
        public IActionResult GetQuotes(int pageNumber, int pageSize)
        {

            var quoteList = _context.GetQuotes(pageNumber, pageSize);
            return Ok(quoteList);
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var quote = _context.GetQuote(id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }

        // PUT: api/Quotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(int id, Quote quote)
        {
            if (_context.GetQuotes(1, 1000) == null)
            {
                return NotFound();
            }
            if (_context.GetQuote(id) == null)
            {
                return BadRequest();
            }


            _context.UpdateQuote(id, quote);

            return NoContent();
        }

        // POST: api/Quotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostQuote(Quote quote)
        {
            
            if (_context.GetQuotes(1, 1000) == null)
            {
                return NotFound();
            }
           

            _context.AddQuote(quote);

            return Ok(quote);
        }

        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var quote = _context.GetQuote(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.DeleteQuote(id);

            return NoContent();
        }

        //private bool QuoteExists(int id)
        //{
        //    return _context.Quotes.Any(e => e.QuoteId == id);
        //}
    }
}
