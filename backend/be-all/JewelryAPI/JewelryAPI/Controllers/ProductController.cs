using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.CustomObjects;
using Repositories.Models;
using Repositories.QueryObjects;
using Services;

namespace JewelryAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ProductService pServices = new ProductService();
        

        [HttpGet]
        public IActionResult GetAllProduct([FromQuery] ProductQueryObject productQuery)
        {
            
            List<ViewProduct> products = pServices.GetAllProduct(productQuery);
            return Ok(products);
        }

        [HttpGet("Active")]
        public IActionResult GetAllActiveProduct()
        {
            
            List<ViewProduct> products = pServices.GetAllActiveProduct();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                
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

        //CREATE
        [HttpPost("Create")]
        public IActionResult CreateProduct(Product product)
        {
            try
            {
                Product newProduct = new Product()
                {
                    ProductName = product.ProductName,
                    ProductDescription = product.ProductDescription,
                    ProductTypeId = product.ProductTypeId,
                    IsActive = product.IsActive
                };
                pServices.CreateProduct(newProduct);
                return Ok(newProduct);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            
        
        }
        //UPDATE
        [HttpPut("Update")]
        public IActionResult UpdateProduct(Product product)
        {
            try
            {
                pServices.UpdateProduct(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }



        //UPDATE


        //GET ALL PRODUCT TYPE
        [HttpGet("type")]
        public IActionResult GetAllProductTypes() 
        {
            List<ProductType> productTypesList = new List<ProductType>();
            productTypesList = pServices.GetAllProductTypes();
            if(productTypesList == null)
            {
                return NotFound();
            }
            return Ok(productTypesList);
        }
    }
}
