using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ICustomerDetailService
    {
        public CustomerDetail GetDetailByUid(string id);

        public CustomerDetail AddCustomerDetail(CustomerDetail customerDetail);

        public CustomerDetail? UpdateDetail(string id, CustomerDetail customerDetail);

        public void DeleteCustomerDetail(string id);
    }
}
