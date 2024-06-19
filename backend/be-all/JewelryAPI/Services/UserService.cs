using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.CustomObjects;
using Repositories.Models;

namespace Services
{
    public class UserService
    {
        private readonly UserRepository userRepository = null;
        public UserService()
        {
            if (userRepository == null)
            {
                userRepository = new UserRepository();
            }
        }
        public List<DetailUser> GetAllUsers()
        {
            return userRepository.GetAllUsers();
        }
        public List<DetailUser> GetAllUsersByRole(int roleId, int pageNumber, int pageSize)
        {
            return userRepository.GetAllUsersByRole(roleId, pageNumber, pageSize);
        }

        public List<Customer> GetCustomers()
        {
            return userRepository.GetCustomers();
        }
        public User AddUser(User user)
        {
            return userRepository.AddUser(user);
        }

        public void DeleteUser(string id)
        {
            userRepository.DeleteUser(id);
        }

        public User GetUser(string id)
        {
            return userRepository.GetUser(id);
        }

        public List<DetailUser> GetUsers()
        {
            return userRepository.GetAllUsers();
        }

        public User UpdateUser(string id, DetailUser user)
        {
            return userRepository.UpdateUser(id, user);
        }
    }
}
