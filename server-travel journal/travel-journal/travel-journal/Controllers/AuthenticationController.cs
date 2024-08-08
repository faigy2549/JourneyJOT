using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using travel_journal.DTO;
using travel_journal.Models;
using travel_journal.Services;

namespace travel_journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            _logger.LogInformation($"Registering user: {model.Username}, {model.Email}");
            try
            {
                if (await _authenticationService.RegisterAsync(model))
                {
                    _logger.LogInformation($"User registered successfully: {model.Username}");
                    return Ok();
                }
                else
                {
                    _logger.LogInformation($"Failed to register user: {model.Username}");
                    ModelState.AddModelError(string.Empty, "Failed to register user.");
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error registering user: {model.Username}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            _logger.LogInformation($"Logging in user: {model.Username}");
            try
            {
                var userId = await _authenticationService.LoginAsync(model);
                if (userId != null) { 
                    _logger.LogInformation($"User logged in successfully: {model.Username}");
                    Response.Cookies.Append("userId", userId, new CookieOptions
                    {
                        HttpOnly = false,
                        Secure = true,   
                        SameSite = SameSiteMode.Lax, 
                        Expires = DateTimeOffset.UtcNow.AddHours(10) 
                    });

                    return Ok(new { message = "Login successful" });
                }
                else
                {
                    _logger.LogInformation($"Invalid login attempt for user: {model.Username}");
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return BadRequest(new { error = "Invalid login attempt" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error logging in user: {model.Username}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
