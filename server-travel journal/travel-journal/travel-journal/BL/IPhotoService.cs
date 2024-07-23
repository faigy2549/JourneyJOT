using travel_journal.DTO;

namespace travel_journal.BL
{
    public interface IPhotoService
    {
        Task<IEnumerable<PhotoDTO>> GetAllPhotosAsync();
        Task<PhotoDTO> GetPhotoByIdAsync(int photoId);
        Task<IEnumerable<PhotoDTO>> GetPhotoByJournalEntryIdAsync(int journalEntryId);
        Task<int> CreatePhotoAsync(PhotoDTO photoCreateDto);
        Task UpdatePhotoAsync(int PhotoId, PhotoDTO photoUpdateDto);
        Task DeletePhotoAsync(int photoId);
}
}
