using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.Dto;
using Repositories.Models;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class RoleController : Controller
    {
        [HttpGet]
        public IActionResult GetAllRoles()
        {
            RoleService services = new RoleService();
            List<Role> roles= services.GetAllRoles();
            if(roles == null)
            {
                return NotFound();
            }
            return Ok(roles);
        }

    }
}
