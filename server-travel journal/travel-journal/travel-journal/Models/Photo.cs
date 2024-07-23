namespace travel_journal.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int JournalEntryId { get; set; }
        public JournalEntry JournalEntry { get; set; }
    }
}
