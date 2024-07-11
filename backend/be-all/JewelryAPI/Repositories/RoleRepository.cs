using Repositories.Models;

namespace Repositories

{
    public class RoleRepository
    {
        private JeweleryOrderProductionContext _context;
        
        public List<Role> GetAllRoles()
        {
            _context = new JeweleryOrderProductionContext();
            return _context.Roles.ToList();
        }
        
    }
}