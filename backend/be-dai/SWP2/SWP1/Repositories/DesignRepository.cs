using AutoMapper;
using Microsoft.EntityFrameworkCore;

using SWP.Interface;
using SWP1.Models;
using System.ComponentModel.Design;


namespace SWP.Repository
{
    public class DesignRepository : IDesign
    {
       private JeweleryOrderProduction1Context _dbContext;
       private readonly IMapper _mapper;

        public DesignRepository(JeweleryOrderProduction1Context dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public ICollection<Design> GetDesigns()
        {
            
            var designs = _dbContext.Designs.ToList();

            return designs;
        }

        public ICollection<Design> GetDesignsByOrderId(int orderCustId)
        {
        
         return _dbContext.Orders.Where(C => C.OrderId == orderCustId).SelectMany(C => C.Designs).ToList();
        }

        public bool OrderExists(int id)
        {
            return _dbContext.Orders.Any(e => e.OrderId == id);  
        }

       
    }
}
