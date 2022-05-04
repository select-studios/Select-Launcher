namespace AccountsAPI.Models
{
    public class Profile
    {
        public string Icon { get; set; }
        public string DisplayName { get; set; }
        public int? Age { get; set; }
        // Include payment methods/account balance later
    }
}