using auction_webapi.Models;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Logging;

namespace auction_webapi.BL
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string recipientEmail, string subject, string body)
        {
            try
            {
                using (var client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password);
                    client.EnableSsl = _emailSettings.EnableSsl;

                    var mail = new MailMessage();
                    mail.From = new MailAddress(_emailSettings.Username);
                    mail.To.Add(new MailAddress(recipientEmail));
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = false;

                    await client.SendMailAsync(mail);
                    _logger.LogInformation($"Email sent to {recipientEmail} with subject {subject}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email");
                throw;
            }
        }
    }
}
