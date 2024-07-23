using travel_journal.Models;

namespace travel_journal.DTO
{
    public class JournalEntryDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int Rating { get; set; }
        public int TripId { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }
    }
}
