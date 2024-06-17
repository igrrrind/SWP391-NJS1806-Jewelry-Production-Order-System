using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Repositories.CustomObjects;
using Repositories.Models;
using Services;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class UsersController : ControllerBase
    {
        private UserService userService;
        public UsersController()
        {
            userService = new UserService();
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var list = userService.GetAllUsers();
            return list == null ? NotFound() : Ok(list);
        }
        [HttpGet("GetRole{roleId}")]

        public IActionResult GetAllUsersByRole(int roleId, int pageNumber, int pageSize)
        {
            return userService.GetAllUsers() == null ? NotFound() : Ok(userService.GetAllUsersByRole(roleId, pageNumber, pageSize));
        }
        [HttpGet("Customers")]
        public IActionResult GetCustomers()
        {
            var list = userService.GetCustomers();
            return list != null ? Ok(list) : NotFound();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            if (userService.GetUsers() == null)
            {
                return NotFound();
            }
            var user = userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, DetailUser user)
        {
            if (!user.Uid.Equals(id))
            {
                return BadRequest();
            }

            userService.UpdateUser(id, user);

            return NoContent();

        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (userService.GetUsers() == null)
            {
                return NotFound();
            }
            userService.AddUser(user);

            return CreatedAtAction("GetUser", new { id = user.Uid }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {

            if (userService.GetUsers() == null)
            {
                return NotFound();
            }
            if (userService.GetUser(id) == null)
            {
                return NotFound();
            }

            userService.DeleteUser(id);
            return NoContent();
        }

        //private bool UserExists(string id)
        //{
        //    return iUserService.Users.Any(e => e.Uid == id);
        //}
    }
}
