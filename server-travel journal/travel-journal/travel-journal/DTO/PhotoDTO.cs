using travel_journal.Models;

namespace travel_journal.DTO
{
    public class PhotoDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int JournalEntryId { get; set; }
    }
}
