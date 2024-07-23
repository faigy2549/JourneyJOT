using System.Collections.Generic;
using System.Threading.Tasks;
using travel_journal.DTO;

namespace travel_journal.Services
{
    public interface ITripService
    {
        Task<IEnumerable<TripDTO>> GetAllTripsAsync();
        Task<TripDTO> GetTripByIdAsync(int tripId);
        Task<IEnumerable<TripDTO>> GetTripByUserIdAsync(string userId);
        Task<int> CreateTripAsync(TripDTO tripCreateDto);
        Task UpdateTripAsync(int tripId, TripDTO tripUpdateDto);
        Task DeleteTripAsync(int tripId);
    }
}