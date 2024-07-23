using auction_webapi.Models;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace auction_webapi.BL
{
        public interface IEmailService
        {
            Task SendEmailAsync(string recipientEmail, string subject, string body);
        }
    }

