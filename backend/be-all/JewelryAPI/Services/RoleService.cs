using Repositories;
using Repositories.Models;

namespace Services

{
    public class RoleService
    {
        private RoleRepository _repository = new RoleRepository();

        public List<Role> GetAllRoles()
        {
            return _repository.GetAllRoles();
        }
        
    }
}