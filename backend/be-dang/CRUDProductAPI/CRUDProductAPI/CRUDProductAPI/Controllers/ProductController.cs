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
            ProductService pServices = new ProductService();
            List<ViewProduct> products = pServices.GetAllProduct();
            return Ok(products);
        }

        [HttpGet("Active")]
        public IActionResult GetAllActiveProduct()
        {
            ProductService pServices = new ProductService();
            List<ViewProduct> products = pServices.GetAllActiveProduct();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                ProductService pServices = new ProductService();
                ViewProduct? product = pServices.GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }

                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
