using travel_journal.Models;

namespace travel_journal.DTO
{
    public class TripDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CoverPhotoUrl { get; set; }
        public int Rating { get; set; }
        public Boolean Starred { get; set; }
        public string UserId { get; set; }
        public ICollection<JournalEntryDTO> JournalEntries { get; set; }
    }
}
