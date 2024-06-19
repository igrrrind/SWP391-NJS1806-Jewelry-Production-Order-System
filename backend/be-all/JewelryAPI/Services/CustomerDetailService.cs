using Repositories;
using Repositories.Models;

namespace Services
{
    public class CustomerDetailService : ICustomerDetailService
    {
        private CustomerDetailRepository? detailRepository = null;
        public CustomerDetail GetDetailByUid(string id)
        {
            detailRepository = new CustomerDetailRepository();
            return detailRepository.GetDetailByUid(id);
        }

        public CustomerDetail AddCustomerDetail(CustomerDetail customerDetail)
        {
            detailRepository = new CustomerDetailRepository();
            return detailRepository.AddCustomerDetail(customerDetail);
        }

        public CustomerDetail? UpdateDetail(string id, CustomerDetail customerDetail)
        {
            detailRepository = new CustomerDetailRepository();
            return detailRepository.UpdateDetail(id, customerDetail);
        }

        public void DeleteCustomerDetail(string id)
        {
            detailRepository = new CustomerDetailRepository();
            detailRepository.DeleteCustomerDetail(id);
        }
    }
}
