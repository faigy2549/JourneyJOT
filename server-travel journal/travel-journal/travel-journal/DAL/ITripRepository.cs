using System.Collections.Generic;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Repositories
{
    public interface ITripRepository
    {
        Task<IEnumerable<Trip>> GetAllTripsAsync();
        Task<Trip> GetTripByIdAsync(int tripId);
        Task<IEnumerable<Trip>> GetTripByUserIdAsync(string userId);
        Task AddTripAsync(Trip trip);
        Task UpdateTripAsync(Trip trip);
        Task DeleteTripAsync(Trip trip);
        // Other methods like adding journal entries, handling photos, etc.
    }
}