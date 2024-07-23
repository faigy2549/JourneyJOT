using travel_journal.Models;

namespace travel_journal.DTO
{
    public class UserDTO
    {
        public string ProfileImage { get; set; }
        public ICollection<TripDTO> Trips { get; set; }
    }
}
