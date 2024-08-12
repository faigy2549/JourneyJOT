using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Services
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterAsync(RegisterModel model);
        Task<string> LoginAsync(LoginModel model);
    }
}
