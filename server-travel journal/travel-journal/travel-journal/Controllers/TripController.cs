using Microsoft.AspNetCore.Mvc;
using travel_journal.DTO;
using travel_journal.Services;
using Microsoft.Extensions.Logging;

namespace travel_journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;
        private readonly ILogger<TripController> _logger;

        public TripController(ITripService tripService, ILogger<TripController> logger)
        {
            _tripService = tripService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDTO>>> Get()
        {
            _logger.LogInformation("Fetching all trips.");
            var trips = await _tripService.GetAllTripsAsync();
            return Ok(trips);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TripDTO>> Get(int id)
        {
            _logger.LogInformation($"Fetching trip with ID {id}.");
            var trip = await _tripService.GetTripByIdAsync(id);
            if (trip == null)
            {
                _logger.LogWarning($"Trip with ID {id} not found.");
                return NotFound();
            }
            return Ok(trip);
        }

        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<IEnumerable<TripDTO>>> Get(string userId)
        {
            _logger.LogInformation($"Fetching trips for user with ID {userId}.");
            var trips = await _tripService.GetTripByUserIdAsync(userId);
            if (trips == null || !trips.Any())
            {
                _logger.LogWarning($"No trips found for user with ID {userId}.");
                return NotFound();
            }
            return Ok(trips);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(TripDTO tripCreateDTO)
        {
            _logger.LogInformation("Creating a new trip.");
            var tripId = await _tripService.CreateTripAsync(tripCreateDTO);
            return CreatedAtAction(nameof(Get), new { id = tripId }, tripId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, TripDTO tripUpdateDTO)
        {
            try
            {
                _logger.LogInformation($"Updating trip with ID {id}.");
                await _tripService.UpdateTripAsync(id, tripUpdateDTO);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, $"Trip with ID {id} not found.");
                return NotFound(ex.Message);
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _logger.LogInformation($"Deleting trip with ID {id}.");
                await _tripService.DeleteTripAsync(id);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, $"Trip with ID {id} not found.");
                return NotFound(ex.Message);
            }
            return NoContent();
        }
    }
}
