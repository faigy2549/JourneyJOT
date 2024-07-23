using Microsoft.EntityFrameworkCore;
using travel_journal.Models;

namespace travel_journal.DAL
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PhotoRepository> _logger;

        public PhotoRepository(ApplicationDbContext context, ILogger<PhotoRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Photo>> GetAllPhotosAsync()
        {
            _logger.LogInformation("Fetching all photos from the database.");
            return await _context.Photos.ToListAsync();
        }

        public async Task<Photo> GetPhotoByIdAsync(int photoId)
        {
            _logger.LogInformation($"Fetching photo with ID {photoId} from the database.");
            return await _context.Photos.FirstOrDefaultAsync(p => p.Id == photoId);
        }

        public async Task<IEnumerable<Photo>> GetPhotoByJournalEntryIdAsync(int journalEntryId)
        {
            _logger.LogInformation($"Fetching photos for journal entry with ID {journalEntryId} from the database.");
            return await _context.Photos.Where(p => p.JournalEntryId == journalEntryId).ToListAsync();
        }

        public async Task AddPhotoAsync(Photo photo)
        {
            _logger.LogInformation("Adding a new photo to the database.");
            await _context.Photos.AddAsync(photo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePhotoAsync(Photo photo)
        {
            _logger.LogInformation($"Updating photo with ID {photo.Id} in the database.");
            _context.Photos.Update(photo);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePhotoAsync(Photo photo)
        {
            _logger.LogInformation($"Deleting photo with ID {photo.Id} from the database.");
            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();
        }
    }
}
