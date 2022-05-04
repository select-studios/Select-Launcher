using System.ComponentModel.DataAnnotations;

namespace AccountsAPI.Models
{
    public class User
    {
        [Required] public int Id { get; set; }
        [Required] public string UserName { get; set; }
        [Required] public string Password { get; set; }
        [Required] public AccountType AccountType { get; set; } = AccountType.Normal;
        public string Email { get; set; }
        public string[]? OwnedGames { get; set; }
        public Profile Profile { get; set; }
    }

    public enum AccountType
    {
        Normal,
        Playtester
    }
}