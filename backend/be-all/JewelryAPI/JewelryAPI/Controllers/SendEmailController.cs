using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class SendEmailController : Controller
    {
        private SendEmailService _sendEmailService = new SendEmailService();

        [HttpPost("SendQuoteEmail")]
        public IActionResult SendQuoteEmail(string email, string firstName, string lastName, int orderId, string link)
        {
            _sendEmailService.SendQuoteEmail(email, firstName, lastName, orderId, link);
            return Ok();
        }
        [HttpPost("SendDesignEmail")]
        public IActionResult SendDesignEmail(string email, string firstName, string lastName, int orderId, string link)
        {
            _sendEmailService.SendDesignEmail(email, firstName, lastName, orderId, link);
            return Ok();

        }
        [HttpPost("SendPlaceOrderEmail")]
        public IActionResult SendPlaceOrderEmail(string email, string firstName, string lastName, int orderId, string link)
        {
            _sendEmailService.SendPlaceOrderEmail(email, firstName, lastName, orderId, link);
            return Ok();
        }
    }
}
