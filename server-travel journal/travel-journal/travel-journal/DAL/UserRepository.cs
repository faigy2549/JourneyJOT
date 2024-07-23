using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<bool> CreateUserAsync(RegisterModel model)
        {
            var user = new User { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            return result.Succeeded;
        }

        public async Task<bool> CheckPasswordAsync(LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, isPersistent: false, lockoutOnFailure: false);
            return result.Succeeded;
        }
    }
}
