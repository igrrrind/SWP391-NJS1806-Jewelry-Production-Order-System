namespace SWP.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        public int CustomerId { get; set; }

        public DateOnly OrderDate { get; set; }

        public string OrderStatus { get; set; } = null!;

        public string PaymentStatus { get; set; } = null!;

        public bool IsShipment { get; set; }

        public bool IsCustom { get; set; }

    }
}
