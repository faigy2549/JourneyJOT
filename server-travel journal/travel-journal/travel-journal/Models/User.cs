using Microsoft.AspNetCore.Identity;

namespace travel_journal.Models
{
    public class User : IdentityUser
    {
        public ICollection<Trip> Trips { get; set; }
    }
}
