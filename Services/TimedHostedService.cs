using System;
using System.Collections.Generic;
using System.Linq;
//using System.Net.Mail;
using System.Threading;
//using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using no_mas_accidentes.Models12;
using Task = System.Threading.Tasks.Task;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace no_mas_accidentes
{
    internal class TimedHostedService : IHostedService, IDisposable
    {
        private readonly ILogger _logger;
        private Timer _timer;
        private ModelContext _context = new ModelContext();

        public TimedHostedService(ILogger<TimedHostedService> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is starting.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private async void DoWork(object state)
        {
            _logger.LogInformation("Timed Background Service is working.");
            Console.WriteLine($"DoWork time: {DateTime.UtcNow}");
            // Custom body
            var to = " ";
            var clientName = " ";

            //var clients = await _context.Company.ToListAsync();

            var clients = _context.Company.Select(c => new
            {
                rut = c.Rut,
                lastPay = c.Pay.OrderByDescending(p => p.DatePay).FirstOrDefault() ?? new Pay(),
                companyData = c
            }).Where(c => c.lastPay.DatePay.Month < DateTime.Today.Month && c.lastPay.DatePay.Year <= DateTime.Today.Year);

            foreach (var cli in clients)
            {
                sendEmail(cli.companyData.Email, cli.companyData.SocialReason, cli.lastPay.DatePay);
            }
            
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public void sendEmail(string to, string clientName, DateTime lastPay)
        {
            var messageEmail = new MimeMessage();
            messageEmail.From.Add(new MailboxAddress("No Reply", "no.reply.accidentes@gmail.com"));
            messageEmail.To.Add(new MailboxAddress(clientName, to));
            messageEmail.Subject = "Atraso de Pago";
            messageEmail.Body = new TextPart("plain")
            {
                Text = $@"Hola {clientName}, 

                       Recuerde pagar su mensualidad. Su último pago ha sido realizado el {lastPay.ToString("dddd, dd MMMM yyyy")}

                       Por favor no responder el correo que se genera de forma automática

                       Saluda atte. No más Accidentes."
            };

            if (lastPay.Year == DateTime.MinValue.Year)
            {
                messageEmail.Subject = "Primer Pago";
                messageEmail.Body = new TextPart("plain")
                {
                    Text = $@"Hola {clientName}, 

                       Por favor recuerde realizar su primer pago.

                       Saluda atte. No más Accidentes."
                };
            }

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect("smtp.gmail.com", 587, false);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate("no.reply.accidentes@gmail.com", "nma123456");

                client.Send(messageEmail);
                client.Disconnect(true);
            }
        }
    }
}
