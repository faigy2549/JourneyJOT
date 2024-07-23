using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Repositories;

namespace travel_journal.BL
{
    public class JournalEntryService : IJournalEntryService
    {
        private readonly IJournalEntryRepository _journalEntryRepository;
        private readonly ILogger<JournalEntryService> _logger;

        public JournalEntryService(IJournalEntryRepository journalEntryRepository, ILogger<JournalEntryService> logger)
        {
            _journalEntryRepository = journalEntryRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<JournalEntryDTO>> GetAllJournalEntriesAsync()
        {
            _logger.LogInformation("Fetching all journal entries.");
            try
            {
                return await _journalEntryRepository.GetAllJournalEntriesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all journal entries.");
                throw;
            }
        }

        public async Task<JournalEntryDTO> GetJournalEntryByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching journal entry with ID {id}.");
            try
            {
                return await _journalEntryRepository.GetJournalEntryByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving journal entry with ID {id}.");
                throw;
            }
        }

        public async Task<IEnumerable<JournalEntryDTO>> GetJournalEntryByTripAsync(int tripId)
        {
            _logger.LogInformation($"Fetching journal entries for trip with ID {tripId}.");
            try
            {
                return await _journalEntryRepository.GetJournalEntryByTripAsync(tripId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving journal entries for trip with ID {tripId}.");
                throw;
            }
        }

        public async Task<int> CreateJournalEntryAsync(JournalEntryDTO journalEntryDTO)
        {
            _logger.LogInformation("Creating a new journal entry.");
            try
            {
                return await _journalEntryRepository.CreateJournalEntryAsync(journalEntryDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating new journal entry.");
                throw;
            }
        }

        public async Task UpdateJournalEntryAsync(int id, JournalEntryDTO journalEntryDTO)
        {
            _logger.LogInformation($"Updating journal entry with ID {id}.");
            try
            {
                await _journalEntryRepository.UpdateJournalEntryAsync(id, journalEntryDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating journal entry with ID {id}.");
                throw;
            }
        }

        public async Task DeleteJournalEntryAsync(int id)
        {
            _logger.LogInformation($"Deleting journal entry with ID {id}.");
            try
            {
                await _journalEntryRepository.DeleteJournalEntryAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting journal entry with ID {id}.");
                throw;
            }
        }
    }
}
