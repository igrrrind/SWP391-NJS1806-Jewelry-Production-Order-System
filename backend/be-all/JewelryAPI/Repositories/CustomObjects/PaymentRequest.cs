namespace Repositories.CustomObjects
{
    public class PaymentRequest
    {
        public string Amount { get; set; }
        public string Info { get; set; }
        public string OrderInfo { get; set; }
        public string ReturnUrl { get; set; }
    }
}