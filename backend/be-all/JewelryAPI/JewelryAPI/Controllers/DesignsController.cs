using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class DesignsController : ControllerBase
    {
        private DesignService _service;

        public DesignsController(DesignService context)
        {
            _service = context;
        }
        

        [HttpGet("{orderId}")]
        public IActionResult GetDesignByCustomId(int orderId)
        {
            var design = _service.GetDesignByOrderCustomId(orderId);
            if (design == null)
            {
                return NotFound();
            }
            return Ok(design);
        }

        [HttpPut("{id}")]
        public IActionResult PutDesign(int id, Design design)
        {
            if (id != design.DesignId)
            {
                return BadRequest();
            }
            if (design == null)
            {
                return BadRequest();
            }
            _service.UpdateDesign(id, design);
            return Ok(design);
        }

        [HttpPost]
        public IActionResult PostDesign(Design design)
        {
            _service.AddDesign(design);
            return Ok(design);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDesign(int id)
        {
            _service.DeleteDesign(id);

            return NoContent();
        }
    }
}
