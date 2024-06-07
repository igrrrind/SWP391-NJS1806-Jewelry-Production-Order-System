using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SWP.Dto;
using SWP.Interface;

using SWP1.Models;

namespace SWP.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
    public class DesignController : Controller
    {
        private readonly IDesign _design;
        private readonly IMapper Mapper;

        public DesignController(IDesign design, IMapper mapper)
        {
            _design = design;
            Mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Design>))]
        [ProducesResponseType(400)]
        public IActionResult GetDesigns()
        {
            var designs = Mapper.Map<List<Design>>(_design.GetDesigns());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(designs);
        }
        [HttpGet("{orderCustId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Design>))]
        [ProducesResponseType(400)]
        public IActionResult GetDesignsByOrderId(int orderCustId)
        {
            if(!_design.OrderExists(orderCustId))
            {
                return NotFound();
            }
            var designs = Mapper.Map<List<Design>>(_design.GetDesignsByOrderId(orderCustId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(designs);
        }
    }
}
