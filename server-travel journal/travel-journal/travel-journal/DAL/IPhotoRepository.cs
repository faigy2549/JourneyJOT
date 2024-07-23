using travel_journal.Models;

namespace travel_journal.DAL
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetAllPhotosAsync();
        Task<Photo> GetPhotoByIdAsync(int PhotoId);
        Task<IEnumerable<Photo>> GetPhotoByJournalEntryIdAsync(int journalEntryId);
        Task AddPhotoAsync(Photo Photo);
        Task UpdatePhotoAsync(Photo Photo);
        Task DeletePhotoAsync(Photo Photo);
    }
}
