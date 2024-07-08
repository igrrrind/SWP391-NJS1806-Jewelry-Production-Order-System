using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Dto;
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
        public List<UserDto> GetAllUsers()
        {
            return userRepository.GetAllUsers();
        }
        public List<UserDto> GetAllUsersByRole(int roleId, int pageNumber, int pageSize)
        {
            return userRepository.GetAllUsersByRole(roleId, pageNumber, pageSize);
        }

        public List<CustomerDto> GetCustomers()
        {
            return userRepository.GetCustomers();
        }
        public CustomerDto GetCustomerByCustomerId(int id){
            return userRepository.GetCustomerByCustomerId(id);
        }
        public User AddUser(User user)
        {
            return userRepository.AddUser(user);
        }

        public void DeleteUser(string id)
        {
            userRepository.DeleteUser(id);
        }

        public UserDto GetUser(string id)
        {
            return userRepository.GetUserDto(id);
        }

        public List<UserDto> GetUsers()
        {
            return userRepository.GetAllUsers();
        }

        public User UpdateUser(string id, UserDto user)
        {
            return userRepository.UpdateUser(id, user);
        }
    }
}
