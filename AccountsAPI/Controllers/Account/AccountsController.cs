using AccountsAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AccountsAPI.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private Dictionary<int, User> Users = new Dictionary<int, User>(); // TODO: Add MongoDB instead of this.
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(ILogger<AccountsController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostAccount")]
        public async Task<ActionResult<User>> PostAccount(User user)
        {
            // Sign up
            if (user == null)
            {
                return BadRequest();
            }
            else
            {
                Users.Add(Users.Count + 1, user);

                return CreatedAtAction(nameof(GetAccount), new { id = Users.Count + 1 }, user);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAccounts()
        {
            try
            {
                return Ok(Users);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<User>> GetAccount(int Id)
        {
            try
            {
                Users.TryGetValue(Id, out var result);

                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
    }
}
