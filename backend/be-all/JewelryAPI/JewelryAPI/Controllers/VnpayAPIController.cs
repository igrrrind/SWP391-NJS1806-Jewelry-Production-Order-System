using Microsoft.AspNetCore.Mvc;
using System.Web;
using Microsoft.AspNetCore.Cors;
using Repositories.CustomObjects;
using Services;
using Repositories;

namespace JewelryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class VnpayAPIController : ControllerBase
    {
        public string url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        public string tmnCode = "V7DAKC1W";
        public string hashSecret = "590RL4KBWETGY625QLZCVQ6HYCGTNYXE";

        [HttpPost]
        [Route("payment")]
        public IActionResult Payment([FromBody] PaymentRequest request)
        {
            string hostName = System.Net.Dns.GetHostName();
            string? clientIPAddress = System.Net.Dns.GetHostAddresses(hostName).GetValue(0).ToString();
            PayLib pay = new PayLib();

            pay.AddRequestData("vnp_Version", "2.1.0"); // API version
            pay.AddRequestData("vnp_Command", "pay"); // Command
            pay.AddRequestData("vnp_TmnCode", tmnCode); // Merchant site code
            pay.AddRequestData("vnp_Amount", request.Amount); // Amount to pay
            pay.AddRequestData("vnp_BankCode", ""); // Bank code
            pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss")); // Payment date
            pay.AddRequestData("vnp_CurrCode", "VND"); // Currency
            pay.AddRequestData("vnp_IpAddr", clientIPAddress); // Client IP address
            pay.AddRequestData("vnp_Locale", "vn"); // L4anguage
            pay.AddRequestData("vnp_OrderInfo", request.Info); // Payment description
            pay.AddRequestData("vnp_OrderType", "other"); // Order type
            pay.AddRequestData("vnp_ReturnUrl", request.ReturnUrl); // Return URL
            pay.AddRequestData("vnp_TxnRef", request.OrderInfo); // Order reference

            string paymentUrl = pay.CreateRequestUrl(url, hashSecret);
            return Ok(new { PaymentUrl = paymentUrl });
        }

        [HttpGet]
        [Route("PaymentConfirm")]
        public IActionResult PaymentConfirm()
        {
            if (Request.QueryString.HasValue)
            {
                var queryString = Request.QueryString.Value;
                var json = HttpUtility.ParseQueryString(queryString);

                long orderId = Convert.ToInt64(json["vnp_TxnRef"]); // Order ID
                string orderInfo = json["vnp_OrderInfo"].ToString(); // Order info
                long vnpayTranId = Convert.ToInt64(json["vnp_TransactionNo"]); // VNPAY transaction ID
                string vnp_ResponseCode = json["vnp_ResponseCode"].ToString(); // Response code
                string vnp_SecureHash = json["vnp_SecureHash"].ToString(); // Secure hash
                var pos = Request.QueryString.Value.IndexOf("&vnp_SecureHash");

                bool checkSignature = ValidateSignature(Request.QueryString.Value.Substring(1, pos - 1), vnp_SecureHash, hashSecret); // Validate signature
                if (checkSignature && tmnCode == json["vnp_TmnCode"].ToString())
                {
                    if (vnp_ResponseCode == "00")
                    {
                        // Payment success
                        return Ok(new { Message = "Payment successful", OrderId = orderId, TransactionId = vnpayTranId });
                    }
                    else
                    {
                        // Payment failure, error code: vnp_ResponseCode
                        return BadRequest(new { Message = "Payment failed", ErrorCode = vnp_ResponseCode });
                    }
                }
                else
                {
                    // Invalid response signature
                    return BadRequest(new { Message = "Invalid response signature" });
                }
            }
            // Invalid response
            return BadRequest(new { Message = "Invalid response" });
        }

        private bool ValidateSignature(string rspraw, string inputHash, string secretKey)
        {
            string myChecksum = PayLib.HmacSHA512(secretKey, rspraw);
            return myChecksum.Equals(inputHash, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
