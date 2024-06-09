using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserBusinessObjects.Models;

namespace UserDAOs
{
    public class UserDAO
    {
        private readonly JeweleryOrderProductionContext dbContext = null;

        public UserDAO()
        {
            if (dbContext == null)
                dbContext = new JeweleryOrderProductionContext();
        }
        public List<User> GetUsers()
        {
            return dbContext.Users.ToList();
        }

        public User GetUser(string id)
        {
            return dbContext.Users.FirstOrDefault(u => u.Uid.Equals(id));
        }

        public User AddUser(User user)
        {
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return user;
        }

        public User UpdateUser(string id, User user)
        {
            User oUser = GetUser(id);
            if (oUser != null)
            {
                oUser.LastName = user.LastName;
                oUser.FirstName = user.FirstName;
                oUser.CustomerDetail = user.CustomerDetail;
                oUser.Email = user.Email;
                oUser.Phone = user.Phone;
                dbContext.SaveChanges();
            }
            return oUser;
        }

        public void DeleteUser(string id)
        {
            User oUser = GetUser(id);
            if (oUser != null)
            {
                dbContext.Remove(oUser);
                dbContext.SaveChanges();
            }

        }
    }
}
