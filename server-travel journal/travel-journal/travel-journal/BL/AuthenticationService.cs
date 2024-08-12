using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AuthenticationService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterModel model)
        {
            _logger.LogInformation($"Attempting to register user: {model.Username}, {model.Email}");
            try
            {
                var user = new User { UserName = model.Username, Email = model.Email, ProfileImage = model.ProfileImage };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"User registered successfully: {model.Username}");
                }
                else
                {
                    _logger.LogInformation($"Failed to register user: {model.Username}");
                    foreach (var error in result.Errors)
                    {
                        _logger.LogError($"Error: {error.Description}");
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error registering user: {model.Username}");
                throw;
            }
        }


        public async Task<string> LoginAsync(LoginModel model)
        {
            _logger.LogInformation($"Attempting to log in user: {model.Username}");
            try
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"User logged in successfully: {model.Username}");
                    var user = await _userManager.FindByNameAsync(model.Username);
                    return user?.Id;
                }
                else
                {
                    _logger.LogInformation($"Invalid login attempt for user: {model.Username}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error logging in user: {model.Username}");
                throw;
            }
        }

    }
}
