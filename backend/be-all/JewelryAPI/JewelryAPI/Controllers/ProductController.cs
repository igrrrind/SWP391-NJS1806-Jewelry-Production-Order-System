using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.Dto;
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
            
            List<ProductDto> products = pServices.GetAllProduct(productQuery);
            return Ok(products);
        }

        

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                
                ProductDto? product = pServices.GetProductById(id);
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
            Product newProduct = new Product()
            {
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductTypeId = product.ProductTypeId,
                IsActive = product.IsActive
            };
            try
            {
                
                pServices.CreateProduct(newProduct);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            
            return Ok(newProduct);
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
        [HttpDelete("DeleteProduct")]
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
