using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SWP.Interface;
using SWP1.Models;

namespace SWP1.Controllers
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
            var orders = _mapper.Map<List<Order>>(_order.GetAllOrders());
           if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(orders);
        }
        [HttpGet("{orderId}") ]
        [ProducesResponseType(200, Type = typeof(Order))]
        [ProducesResponseType(400)]
        public IActionResult GetOrderById(int orderId)
        {
            var order = _mapper.Map<Order>(_order.GetOrderById(orderId));
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(order);
        }

       
    }
}
