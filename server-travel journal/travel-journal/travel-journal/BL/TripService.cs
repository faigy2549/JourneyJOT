using travel_journal.DTO;
using travel_journal.Models;
using travel_journal.Repositories;
using Microsoft.Extensions.Logging;

namespace travel_journal.Services
{
    public class TripService : ITripService
    {
        private readonly ITripRepository _tripRepository;
        private readonly ILogger<TripService> _logger;

        public TripService(ITripRepository tripRepository, ILogger<TripService> logger)
        {
            _tripRepository = tripRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<TripDTO>> GetAllTripsAsync()
        {
            _logger.LogInformation("Fetching all trips from the database.");
            var trips = await _tripRepository.GetAllTripsAsync();
            return MapToTripDTOs(trips);
        }

        public async Task<TripDTO> GetTripByIdAsync(int tripId)
        {
            _logger.LogInformation($"Fetching trip with ID {tripId} from the database.");
            var trip = await _tripRepository.GetTripByIdAsync(tripId);
            return MapToTripDTO(trip);
        }

        public async Task<IEnumerable<TripDTO>> GetTripByUserIdAsync(string userId)
        {
            _logger.LogInformation($"Fetching trips for user with ID {userId} from the database.");
            var trips = await _tripRepository.GetTripByUserIdAsync(userId);
            return MapToTripDTOs(trips);
        }

        public async Task<int> CreateTripAsync(TripDTO tripCreateDto)
        {
            _logger.LogInformation("Adding a new trip to the database.");
            var trip = MapToTrip(tripCreateDto);
            await _tripRepository.AddTripAsync(trip);
            return trip.Id;
        }

        public async Task UpdateTripAsync(int tripId, TripDTO tripUpdateDto)
        {
            _logger.LogInformation($"Updating trip with ID {tripId}.");
            var existingTrip = await _tripRepository.GetTripByIdAsync(tripId);
            if (existingTrip == null)
            {
                _logger.LogWarning($"Trip with ID {tripId} not found.");
                throw new ArgumentException($"Trip with id {tripId} not found.");
            }

            MapToTrip(tripUpdateDto, existingTrip);
            await _tripRepository.UpdateTripAsync(existingTrip);
        }

        public async Task DeleteTripAsync(int tripId)
        {
            _logger.LogInformation($"Deleting trip with ID {tripId}.");
            var existingTrip = await _tripRepository.GetTripByIdAsync(tripId);
            if (existingTrip == null)
            {
                _logger.LogWarning($"Trip with ID {tripId} not found.");
                throw new ArgumentException($"Trip with id {tripId} not found.");
            }

            await _tripRepository.DeleteTripAsync(existingTrip);
        }

        private TripDTO MapToTripDTO(Trip trip)
        {
            return new TripDTO
            {
                Id = trip.Id,
                Title = trip.Title,
                Description = trip.Description,
                StartDate = trip.StartDate,
                EndDate = trip.EndDate,
                CoverPhotoUrl = trip.CoverPhotoUrl,
                UserId = trip.UserId,
                JournalEntries = MapToJournalEntryDTOs(trip.JournalEntries),
            };
        }

        private IEnumerable<TripDTO> MapToTripDTOs(IEnumerable<Trip> trips)
        {
            var tripDTOs = new List<TripDTO>();
            foreach (var trip in trips)
            {
                tripDTOs.Add(MapToTripDTO(trip));
            }
            return tripDTOs;
        }

        private Trip MapToTrip(TripDTO tripCreateDto)
        {
            return new Trip
            {
                Title = tripCreateDto.Title,
                Description = tripCreateDto.Description,
                StartDate = tripCreateDto.StartDate,
                EndDate = tripCreateDto.EndDate,
                CoverPhotoUrl = tripCreateDto.CoverPhotoUrl,
                UserId = tripCreateDto.UserId,
            };
        }

        private void MapToTrip(TripDTO tripUpdateDto, Trip trip)
        {
            trip.Title = tripUpdateDto.Title;
            trip.Description = tripUpdateDto.Description;
            trip.StartDate = tripUpdateDto.StartDate;
            trip.EndDate = tripUpdateDto.EndDate;
            trip.CoverPhotoUrl = tripUpdateDto.CoverPhotoUrl;
        }

        private ICollection<JournalEntryDTO> MapToJournalEntryDTOs(ICollection<JournalEntry> journalEntries)
        {
            var journalEntryDTOs = new List<JournalEntryDTO>();
            foreach (var entry in journalEntries)
            {
                journalEntryDTOs.Add(new JournalEntryDTO
                {
                    Id = entry.Id,
                    Text = entry.Text,
                    Date = entry.Date,
                    Location = entry.Location,
                    TripId = entry.TripId,
                });
            }
            return journalEntryDTOs;
        }
    }
}
