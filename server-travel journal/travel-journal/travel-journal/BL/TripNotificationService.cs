
using Microsoft.EntityFrameworkCore;
using auction_webapi.BL;

public class TripNotificationService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IEmailService _emailService;
    private readonly ILogger<TripNotificationService> _logger;

    public TripNotificationService(IServiceProvider serviceProvider, IEmailService emailService, ILogger<TripNotificationService> logger)
    {
        _serviceProvider = serviceProvider;
        _emailService = emailService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await SendDailyTripNotificationsAsync();
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }

    private async Task SendDailyTripNotificationsAsync()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var today = DateTime.Today;

            var usersOnTrips = await dbContext.Trips
                .Include(t => t.User)
                .Where(t => t.StartDate <= today && t.EndDate >= today)
                .Select(t => new { t.User.Email, t.Title, DayNumber = (today - t.StartDate).Days + 1 })
                .Distinct()
                .ToListAsync();

            foreach (var tripInfo in usersOnTrips)
            {
                try
                {
                    string emailBody = $"Hello,\r\n\r\n" +
                    $"You're currently at '{tripInfo.Title}', enjoying your journey. " +
                    $"Today marks day {tripInfo.DayNumber} of your adventure.\r\n\r\n" +
                    $"Take a moment to capture the experiences of today in your travel journal. " +
                    $"Whether it's the breathtaking views, delicious meals, or new friends you've met along the way, " +
                    $"each memory is worth cherishing.\r\n\r\n" +
                    $"Don't forget to capture the little details that make this trip special. " +
                    $"Your journal will be a treasure trove of memories to look back on in the years to come.\r\n\r\n" +
                    $"Wishing you a fantastic day filled with exciting discoveries and unforgettable moments!\r\n\r\n" +
                    $"JourneyJot";


                    await _emailService.SendEmailAsync(tripInfo.Email,
                        $"JourneyJot Reminder- Journal Your Trip To {tripInfo.Title}",
                        emailBody);
                    _logger.LogInformation($"Notification email sent to {tripInfo.Email}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Failed to send notification email to {tripInfo.Email}");
                }
            }
        }
    }
}
