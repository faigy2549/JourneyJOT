using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(RegisterModel model);
        Task<bool> CheckPasswordAsync(LoginModel model);
    }
}
