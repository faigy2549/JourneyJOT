using System.Collections.Generic;
using System.Threading.Tasks;
using travel_journal.DTO;

namespace travel_journal.BL
{
    public interface IJournalEntryService
    {
        Task<IEnumerable<JournalEntryDTO>> GetAllJournalEntriesAsync();
        Task<JournalEntryDTO> GetJournalEntryByIdAsync(int id);
        Task<IEnumerable<JournalEntryDTO>> GetJournalEntryByTripAsync(int tripId);
        Task<int> CreateJournalEntryAsync(JournalEntryDTO journalEntryDTO);
        Task UpdateJournalEntryAsync(int id, JournalEntryDTO journalEntryDTO);
        Task DeleteJournalEntryAsync(int id);
    }
}
