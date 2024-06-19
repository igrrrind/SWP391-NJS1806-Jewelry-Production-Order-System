using Repositories.Models;

namespace Repositories
{
    public class CustomerDetailRepository
    {
        private JeweleryOrderProductionContext? context = null;
        public CustomerDetail? GetDetailByUid(string id)
        {
            context = new JeweleryOrderProductionContext();
            return context.CustomerDetails.FirstOrDefault(d => d.Uid.Equals(id));
        }

        public CustomerDetail AddCustomerDetail(CustomerDetail customerDetail)
        {
            context = new JeweleryOrderProductionContext();
            context.CustomerDetails.Add(customerDetail);
            context.SaveChanges();
            return customerDetail;
        }

        public CustomerDetail? UpdateDetail(string id, CustomerDetail customerDetail)
        {
            context = new JeweleryOrderProductionContext();
            CustomerDetail? oDetail = GetDetailByUid(id);
            if (oDetail != null)
            {
                oDetail.AddressLine = customerDetail.AddressLine;
                oDetail.Orders = customerDetail.Orders;
                oDetail.BirthDate = customerDetail.BirthDate;
                oDetail.Province = customerDetail.Province;
                oDetail.Sex = customerDetail.Sex;
                context.SaveChanges();
            }
            return oDetail;
        }

        public void DeleteCustomerDetail(string id)
        {
            context = new JeweleryOrderProductionContext();
            CustomerDetail? oDetail = GetDetailByUid(id);
            if (oDetail != null)
            {
                context.CustomerDetails.Remove(oDetail);
                context.SaveChanges();
            }
        }
    }
}
