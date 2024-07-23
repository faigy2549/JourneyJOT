namespace travel_journal.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CoverPhotoUrl { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public ICollection<JournalEntry> JournalEntries { get; set; }
    }
}
