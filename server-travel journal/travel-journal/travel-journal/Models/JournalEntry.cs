namespace travel_journal.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int Rating { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
