using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Services
{//quotes, design, place order, receipt
    public class SendEmailService
    {
        public void SendQuoteEmail(string email, string firstName, string lastName, int orderId, string link)
        {
            string fromMail = "pacifajewelry@gmail.com";
            string fromPassword = "cbakeikturrqmcav";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Pacifa's Notification";
            message.To.Add(new MailAddress(email));
            string orderID = "" + orderId;
            string messageText = "Your quote is ready, please check and make payment as soon as possible, Thank you!";

            string body = @"
    <html>
    <head>
        <style>
            /* Define styles for the email body */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Dear {{firstName}} {{lastName}},</h2>
            <p>Greetings! We hope this email finds you well.</p>
            <p>Your order <strong>#{{orderID}}</strong>'s quote is READY! </p>
            <p><em>{{messageText}}</em></p>
            <p>For more details, please click the link below:</p>
            <p><a class='button' href='{{link}}'>View Order Details</a></p>
            <p>Thank you for choosing our service!</p>
            <p>Best regards,<br/>Pacifa Jewelry</p>
        </div>
    </body>
    </html>";

            // Replace placeholders with actual values
            body = body.Replace("{{firstName}}", firstName);
            body = body.Replace("{{lastName}}", lastName);
            body = body.Replace("{{orderID}}", orderID);
            body = body.Replace("{{link}}", link);
            body = body.Replace("{{messageText}}", messageText);

            message.Body = body;
            message.IsBodyHtml = true;
      

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }

        public void SendDesignEmail(string email, string firstName, string lastName, int orderId, string link)
        {
            string fromMail = "pacifajewelry@gmail.com";
            string fromPassword = "cbakeikturrqmcav";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Pacifa's Notification";
            message.To.Add(new MailAddress(email));
            string orderID = "" + orderId;
            string messageText = "Your design is ready! Why don't you come over, take a look and leave a feedback? Let us know that you are satisfied with the design";

            string body = @"
    <html>
    <head>
        <style>
            /* Define styles for the email body */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Dear {{firstName}} {{lastName}},</h2>
            <p>Greetings! We hope this email finds you well.</p>
            <p>Your order <strong>#{{orderID}}</strong>'s DESIGN is HERE! </p>
            <p><em>{{messageText}}</em></p>
            <p>For more details, please click the link below:</p>
            <p><a class='button' href='{{link}}'>View Order Details</a></p>
            <p>Thank you for choosing our service!</p>
            <p>Best regards,<br/>Pacifa Jewelry</p>
        </div>
    </body>
    </html>";

            // Replace placeholders with actual values
            body = body.Replace("{{firstName}}", firstName);
            body = body.Replace("{{lastName}}", lastName);
            body = body.Replace("{{orderID}}", orderID);
            body = body.Replace("{{link}}", link);
            body = body.Replace("{{messageText}}", messageText);

            message.Body = body;
            message.IsBodyHtml = true;
            

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }


        public void SendPlaceOrderEmail(string email, string firstName, string lastName, int orderId, string link)
        {
           

            string fromMail = "pacifajewelry@gmail.com";
            string fromPassword = "cbakeikturrqmcav";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Pacifa's Notification";
            message.To.Add(new MailAddress(email));
            string orderID = "" + orderId;
            string messageText = "Thank you for your order! We are processing it and will update you soon.";

            string body = @"
    <html>
    <head>
        <style>
            /* Define styles for the email body */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Dear {{firstName}} {{lastName}},</h2>
            <p>Greetings! We hope this email finds you well.</p>
            <p>Your order <strong>#{{orderID}}</strong> has been received and is being processed. </p>
            <p><em>{{messageText}}</em></p>
            <p>For more details, please click the link below:</p>
            <p><a class='button' href='{{link}}'>View Order Details</a></p>
            <p>Thank you for choosing our service!</p>
            <p>Best regards,<br/>Pacifa Jewelry</p>
        </div>
    </body>
    </html>";

            // Replace placeholders with actual values
            body = body.Replace("{{firstName}}", firstName);
            body = body.Replace("{{lastName}}", lastName);
            body = body.Replace("{{orderID}}", orderID);
            body = body.Replace("{{link}}", link);
            body = body.Replace("{{messageText}}", messageText);

            message.Body = body;
            message.IsBodyHtml = true;
           

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }

    }
}
