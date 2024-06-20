using Repositories.CustomObjects;
using Repositories.Models;

namespace Repositories
{

    public class UserRepository
    {
        private JeweleryOrderProductionContext? _context = null;

        public List<DetailUser> GetAllUsers()
        {
            _context = new JeweleryOrderProductionContext();
            var detailUserList = from u in _context.Users
                                 join r in _context.Roles
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
            _context = new JeweleryOrderProductionContext();
            var customerList = from u in _context.Users
                               join r in _context.Roles
                               on u.RoleId equals r.RoleId
                               join d in _context.CustomerDetails
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
            _context = new JeweleryOrderProductionContext();
            var detailUser = (from u in _context.Users
                              join r in _context.Roles
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
        public List<DetailUser> GetAllUsersByRole(int roleId, int pageNumber, int pageSize)
        {
            _context = new JeweleryOrderProductionContext();
            var detailUserList = from u in _context.Users
                                 join r in _context.Roles
                                 on u.RoleId equals r.RoleId
                                 where u.RoleId == roleId
                                 select new DetailUser()
                                 {
                                     Uid = u.Uid,
                                     Email = u.Email,
                                     Phone = u.Phone,
                                     FirstName = u.FirstName,
                                     LastName = u.LastName,
                                     RoleName = r.RoleName
                                 };
            var skipNumber = (pageNumber - 1) * pageSize;
            return detailUserList.ToList().Skip(skipNumber).Take(pageSize).ToList();
        }
        public User GetUser(string id)
        {
            _context = new JeweleryOrderProductionContext();
        
            return _context.Users.FirstOrDefault(u => u.Uid.Equals(id));
            
        }

        public User AddUser(User user)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User? UpdateUser(string id, DetailUser user)
        {
            _context = new JeweleryOrderProductionContext();
            User? oUser = GetUser(id);
            if (oUser != null)
            {
                oUser.LastName = user.LastName;
                oUser.FirstName = user.FirstName;
                oUser.Email = user.Email;
                oUser.Phone = user.Phone;
                _context.SaveChanges();
            }
            return oUser;
        }

        public void DeleteUser(string id)
        {
            _context = new JeweleryOrderProductionContext();
            CustomerDetail? oDetail = _context.CustomerDetails.FirstOrDefault(d => d.Uid.Equals(id));
            Order? oOrder = _context.Orders.FirstOrDefault(o => o.CustomerId.Equals(id));
            User oUser = GetUser(id);
            if (oOrder != null)
            {
                _context.Remove(oOrder);
            }
            if (oDetail != null)
            {
                _context.Remove(oDetail);
            }
            if (oUser != null)
            {
                _context.Remove(oUser);
                _context.SaveChanges();
            }

        }


    }
}