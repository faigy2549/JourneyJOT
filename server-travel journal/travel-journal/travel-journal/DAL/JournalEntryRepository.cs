using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;
using travel_journal.Repositories;

namespace travel_journal.DAL
{
    public class JournalEntryRepository : IJournalEntryRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<JournalEntryRepository> _logger;

        public JournalEntryRepository(ApplicationDbContext context, ILogger<JournalEntryRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<JournalEntryDTO>> GetAllJournalEntriesAsync()
        {
            _logger.LogInformation("Fetching all journal entries.");
            try
            {
                return await _context.JournalEntries
                                     .Include(e => e.Photos)
                                     .Select(e => new JournalEntryDTO
                                     {
                                         Id = e.Id,
                                         Text = e.Text,
                                         Date = e.Date,
                                         Location = e.Location,
                                         TripId = e.TripId,
                                         Rating = e.Rating,
                                         Photos = e.Photos.Select(p => new PhotoDTO
                                         {
                                             Url = p.Url,
                                             JournalEntryId = e.Id
                                         }).ToList()
                                     })
                                     .ToListAsync();
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
                var entry = await _context.JournalEntries
                                          .Include(e => e.Photos)
                                          .FirstOrDefaultAsync(e => e.Id == id);
                if (entry == null) return null;

                return new JournalEntryDTO
                {
                    Id = entry.Id,
                    Text = entry.Text,
                    Date = entry.Date,
                    Location = entry.Location,
                    TripId = entry.TripId,
                    Rating = entry.Rating,
                    Photos = entry.Photos.Select(p => new PhotoDTO
                    {
                        Id = p.Id,
                        Url = p.Url,
                        JournalEntryId = p.JournalEntryId,
                    }).ToList()
                };
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
                return await _context.JournalEntries
                                     .Where(e => e.TripId == tripId)
                                     .Include(e => e.Photos)
                                     .Select(e => new JournalEntryDTO
                                     {
                                         Id = e.Id,
                                         Text = e.Text,
                                         Date = e.Date,
                                         Location = e.Location,
                                         TripId = e.TripId,
                                         Rating = e.Rating,
                                         Photos = e.Photos.Select(p => new PhotoDTO
                                         {
                                             Id = p.Id,
                                             Url = p.Url,
                                             JournalEntryId = p.JournalEntryId,
                                         }).ToList()
                                     })
                                     .ToListAsync();
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
                var entry = new JournalEntry
                {
                    Text = journalEntryDTO.Text,
                    Date = journalEntryDTO.Date,
                    Location = journalEntryDTO.Location,
                    TripId = journalEntryDTO.TripId,
                    Rating = journalEntryDTO.Rating,
                    Photos = journalEntryDTO.Photos.Select(p => new Photo
                    {
                        Url = p.Url,
                        JournalEntryId = journalEntryDTO.Id, 
                    }).ToList()

                };
                _context.JournalEntries.Add(entry);
                await _context.SaveChangesAsync();

                // Update Photos
                var entryWithPhotos = await _context.JournalEntries
                                          .FirstOrDefaultAsync(e => e.Id == entry.Id);
                if (entryWithPhotos != null)
                {
                    entryWithPhotos.Photos = journalEntryDTO.Photos.Select(p => new Photo
                    {
                        Url = p.Url,
                        JournalEntryId = entryWithPhotos.Id,
                    }).ToList();
                }
                _context.JournalEntries.Update(entryWithPhotos);
                await _context.SaveChangesAsync();

                return entry.Id;
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
                var entry = await _context.JournalEntries.Include(e => e.Photos).FirstOrDefaultAsync(e => e.Id == id);
                if (entry == null) throw new ArgumentException("Journal entry not found.");

                entry.Text = journalEntryDTO.Text;
                entry.Date = journalEntryDTO.Date;
                entry.Location = journalEntryDTO.Location;
                entry.Rating = journalEntryDTO.Rating;
                // Update Photos
                entry.Photos.Clear();
                foreach (var photoDTO in journalEntryDTO.Photos)
                {
                    entry.Photos.Add(new Photo
                    {
                        Url = photoDTO.Url,
                        JournalEntryId = photoDTO.JournalEntryId,
                    });
                }

                await _context.SaveChangesAsync();
                UpdateTripRating(journalEntryDTO.TripId);
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
                var entry = await _context.JournalEntries.FindAsync(id);
                if (entry == null) throw new ArgumentException("Journal entry not found.");

                _context.JournalEntries.Remove(entry);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting journal entry with ID {id}.");
                throw;
            }
        }
        public void UpdateTripRating(int tripId)
        {
            var trip = _context.Trips
                .Include(t => t.JournalEntries)
                .SingleOrDefault(t => t.Id == tripId);

            if (trip != null)
            {
                if (trip.JournalEntries == null || !trip.JournalEntries.Any())
                {
                    trip.Rating = 0;
                }
                else
                {
                    trip.Rating = (int)trip.JournalEntries.Average(j => j.Rating);
                }

                _context.SaveChanges();
            }
        }
    }
}
