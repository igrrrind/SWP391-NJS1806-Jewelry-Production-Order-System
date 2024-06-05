using SWP.Models;

namespace SWP.Interface
{
    public interface IDesign
    {

        ICollection<Design> GetDesigns();
    
        ICollection<Design> GetDesignsByOrderId(int orderCustId);
    }
}
