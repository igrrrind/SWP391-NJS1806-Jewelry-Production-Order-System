using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class CustomerDetailRepository
    {
        private JeweleryOrderProductionContext context;
        public CustomerDetail GetDetailByUid(string id)
        {
            context = new JeweleryOrderProductionContext();
            return context.CustomerDetails.FirstOrDefault(d => d.Uid.Equals(id));
        }
    }
}
