using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.CustomizeObjects;
using Repositories.Models;
using Repositories.QueryObjects;
using Services;

namespace CRUDProductAPI.Controllers
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
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            
            return Ok();
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



        //DELETE
        [HttpPut("DeleteProduct")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                pServices.DeleteProduct(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { Success = true, Data = "Delete Successfully" });
        }
        
        

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
