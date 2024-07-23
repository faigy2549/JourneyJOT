using Microsoft.EntityFrameworkCore;
using travel_journal.DTO;
using travel_journal.Models;
using Microsoft.Extensions.Logging;

namespace travel_journal.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TripRepository> _logger;

        public TripRepository(ApplicationDbContext context, ILogger<TripRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Trip>> GetAllTripsAsync()
        {
            _logger.LogInformation("Fetching all trips from the database.");
            return await _context.Trips
                .Include(t => t.JournalEntries)
                .ToListAsync();
        }

        public async Task<Trip> GetTripByIdAsync(int tripId)
        {
            _logger.LogInformation($"Fetching trip with ID {tripId} from the database.");
            return await _context.Trips
                .Include(t => t.JournalEntries)
                .FirstOrDefaultAsync(t => t.Id == tripId);
        }

        public async Task<IEnumerable<Trip>> GetTripByUserIdAsync(string userId)
        {
            _logger.LogInformation($"Fetching trips for user with ID {userId} from the database.");
            return await _context.Trips
               .Where(t => t.UserId == userId)
                .Include(t => t.JournalEntries)
                .ToListAsync();
        }

        public async Task AddTripAsync(Trip trip)
        {
            _logger.LogInformation("Adding a new trip to the database.");
            await _context.Trips.AddAsync(trip);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTripAsync(Trip trip)
        {
            _logger.LogInformation($"Updating trip with ID {trip.Id} in the database.");
            _context.Trips.Update(trip);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTripAsync(Trip trip)
        {
            _logger.LogInformation($"Deleting trip with ID {trip.Id} from the database.");
            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();
        }
    }
}
