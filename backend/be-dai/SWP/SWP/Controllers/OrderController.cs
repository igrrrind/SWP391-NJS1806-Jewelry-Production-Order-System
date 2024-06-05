using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SWP.Interface;
using SWP.Models;

namespace SWP.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrder _order;
        private readonly IMapper _mapper;

        public OrderController(IOrder order, IMapper mapper)
        {
            _order = order;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Order>))]
        [ProducesResponseType(400)]
        public IActionResult GetAllOrders()
        {
            var orders = _mapper.Map<List<Order>>(_order.GetAllOrders);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(orders);
        }
    }
}
