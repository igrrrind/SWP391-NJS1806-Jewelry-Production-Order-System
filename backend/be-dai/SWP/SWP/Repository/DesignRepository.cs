using Microsoft.EntityFrameworkCore;

using SWP.Interface;
using SWP.Models;
using System.ComponentModel.Design;


namespace SWP.Repository
{
    public class DesignRepository : IDesign
    {
       private JeweleryOrderproductionContext _dbContext;


        public ICollection<Design> GetDesigns()
        {
            _dbContext = new JeweleryOrderproductionContext();
            var designs = _dbContext.Designs.ToList();

            return designs;
        }

        public ICollection<Design> GetDesignsByOrderId(int orderCustId)
        {
            _dbContext = new JeweleryOrderproductionContext();
         return _dbContext.Orders.Where(C => C.OrderId == orderCustId).SelectMany(C => C.Designs).ToList();
        }
    }
}
