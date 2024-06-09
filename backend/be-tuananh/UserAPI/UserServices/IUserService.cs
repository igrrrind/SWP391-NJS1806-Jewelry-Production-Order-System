using Microsoft.EntityFrameworkCore;
using Repositories.CustomObjects;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserService
    {
        public List<DetailUser> GetAllUsers();
        public List<DetailUser> GetCustomers();
        public DetailUser GetUser(string id);
        public DetailUser AddUser(DetailUser user);
        public DetailUser UpdateUser(string id, DetailUser user);
        public void DeleteUser(string id);
    }
}
