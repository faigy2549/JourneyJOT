using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger<TripRepository> _logger;

        public UserRepository( ApplicationDbContext context, ILogger<TripRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            //return await _userManager.FindByIdAsync(id);
            _logger.LogInformation($"Fetching user with ID {id} from the database.");
            return await _context.Users
                .Include(t => t.Trips)
                .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
