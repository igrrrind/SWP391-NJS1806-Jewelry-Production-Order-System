using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.CustomizeObjects;
using Services;

namespace CRUDProductAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")] 
    [ApiController]
    public class ProductController : ControllerBase
    {
        

        [HttpGet]
        public IActionResult GetAllProduct()
        {
            ProductServices pServices = new ProductServices();
            List<ViewProduct> products = pServices.GetAllProduct();
            return Ok(products);
        }
    }
}
