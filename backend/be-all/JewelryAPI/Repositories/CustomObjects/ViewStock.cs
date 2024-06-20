namespace Repositories.CustomObjects
{
    public class ViewStock
    {
        public int ProductStockId { get; set; }

        public int ProductId { get; set; }

        public int GemstoneId { get; set; }

        public string GemstoneType { get; set; } = null!;

        public string? GemstoneColor { get; set; }

        public int MetalId { get; set; }

        public string MetalTypeName { get; set; } = null!;

        public int? Size { get; set; }

        public int? StockQuantity { get; set; }

        public decimal Price { get; set; }

        public string? GalleryUrl { get; set; }
    }
}
