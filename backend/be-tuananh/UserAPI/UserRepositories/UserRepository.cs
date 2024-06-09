using Microsoft.EntityFrameworkCore;
using Repositories.CustomObjects;
using Repositories.Models;

namespace Repositories
{

    public class UserRepository
    {
        private JeweleryOrderProductionContext dbContext = null;

        public List<DetailUser> GetAllUsers()
        {
            dbContext = new JeweleryOrderProductionContext();
            var detailUserList = from u in dbContext.Users
                                 join r in dbContext.Roles
                                 on u.RoleId equals r.RoleId
                                 select new DetailUser()
                                 {
                                     Uid = u.Uid,
                                     Email = u.Email,
                                     Phone = u.Phone,
                                     FirstName = u.FirstName,
                                     LastName = u.LastName,
                                     RoleName = r.RoleName
                                 };

            return detailUserList.ToList();
        }

        public List<Customer> GetCustomers()
        {
            dbContext = new JeweleryOrderProductionContext();
            var customerList = from u in dbContext.Users
                               join r in dbContext.Roles
                               on u.RoleId equals r.RoleId
                               join d in dbContext.CustomerDetails
                               on u.Uid equals d.Uid
                               where u.RoleId == 5
                               select new Customer()
                               {
                                   Uid = u.Uid,
                                   CustomerId = d.CustomerId,
                                   Email = u.Email,
                                   Phone = u.Phone,
                                   RoleName = r.RoleName,
                                   FirstName = u.FirstName,
                                   LastName = u.LastName,
                                   Sex = d.Sex,
                                   BirthDate = d.BirthDate,
                                   AddressLine = d.AddressLine,
                                   Province = d.Province,
                                   DistrictTown = d.DistrictTown,

                               };
            return customerList.ToList();
        }
        public DetailUser? GetDetailUser(string id)
        {
            dbContext = new JeweleryOrderProductionContext();
            var detailUser = (from u in dbContext.Users
                              join r in dbContext.Roles
                              on u.RoleId equals r.RoleId
                              select new DetailUser()
                              {
                                  Uid = u.Uid,
                                  Email = u.Email,
                                  Phone = u.Phone,
                                  FirstName = u.FirstName,
                                  LastName = u.LastName,
                                  RoleName = r.RoleName
                              }).FirstOrDefault(u => u.Uid.Equals(id));

            return detailUser;
        }

        public User? GetUser(string id)
        {
            dbContext = new JeweleryOrderProductionContext();
            return dbContext.Users.FirstOrDefault(u => u.Uid.Equals(id));
        }

        public User AddUser(User user)
        {
            dbContext = new JeweleryOrderProductionContext();
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return user;
        }

        public User UpdateUser(string id, DetailUser user)
        {
            dbContext = new JeweleryOrderProductionContext();
            User oUser = GetUser(id);
            if (oUser != null)
            {
                oUser.LastName = user.LastName;
                oUser.FirstName = user.FirstName;
                oUser.Email = user.Email;
                oUser.Phone = user.Phone;
                dbContext.SaveChanges();
            }
            return oUser;
        }

        public void DeleteUser(string id)
        {
            dbContext = new JeweleryOrderProductionContext();
            CustomerDetail oDetail = dbContext.CustomerDetails.FirstOrDefault(d => d.Uid.Equals(id));
            User oUser = GetUser(id);
            if (oUser != null)
            {
                dbContext.Remove(oDetail);
                dbContext.Remove(oUser);
                dbContext.SaveChanges();
            }

        }


    }
}