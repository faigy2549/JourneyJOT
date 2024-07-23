using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using travel_journal.BL;
using travel_journal.DTO;

namespace travel_journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalEntryController : ControllerBase
    {
        private readonly IJournalEntryService _journalEntryService;
        private readonly ILogger<JournalEntryController> _logger;

        public JournalEntryController(IJournalEntryService journalEntryService, ILogger<JournalEntryController> logger)
        {
            _journalEntryService = journalEntryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JournalEntryDTO>>> Get()
        {
            _logger.LogInformation("Fetching all journal entries.");
            try
            {
                var journalEntries = await _journalEntryService.GetAllJournalEntriesAsync();
                return Ok(journalEntries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all journal entries.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JournalEntryDTO>> Get(int id)
        {
            _logger.LogInformation($"Fetching journal entry with ID {id}.");
            try
            {
                var journalEntry = await _journalEntryService.GetJournalEntryByIdAsync(id);
                if (journalEntry == null)
                {
                    _logger.LogWarning($"Journal entry with ID {id} not found.");
                    return NotFound();
                }
                return Ok(journalEntry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving journal entry with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("tripId/{tripId}")]
        public async Task<ActionResult<IEnumerable<JournalEntryDTO>>> GetByTrip(int tripId)
        {
            _logger.LogInformation($"Fetching journal entries for trip with ID {tripId}.");
            try
            {
                var journalEntries = await _journalEntryService.GetJournalEntryByTripAsync(tripId);
                if (journalEntries == null)
                {
                    _logger.LogWarning($"No journal entries found for trip with ID {tripId}.");
                    return NotFound();
                }
                return Ok(journalEntries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving journal entries for trip with ID {tripId}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] JournalEntryDTO journalEntryDTO)
        {
            _logger.LogInformation("Creating a new journal entry.");
            try
            {
                var journalEntryId = await _journalEntryService.CreateJournalEntryAsync(journalEntryDTO);
                return CreatedAtAction(nameof(Get), new { id = journalEntryId }, journalEntryId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating new journal entry.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] JournalEntryDTO journalEntryDTO)
        {
            _logger.LogInformation($"Updating journal entry with ID {id}.");
            try
            {
                await _journalEntryService.UpdateJournalEntryAsync(id, journalEntryDTO);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning($"Journal entry with ID {id} not found.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating journal entry with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation($"Deleting journal entry with ID {id}.");
            try
            {
                await _journalEntryService.DeleteJournalEntryAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning($"Journal entry with ID {id} not found.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting journal entry with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
