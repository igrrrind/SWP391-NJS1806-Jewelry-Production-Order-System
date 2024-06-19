namespace Repositories.QueryObjects
{
    public class ProductQueryObject
    {
        public int? ProductTypeId { get; set; } = 0;
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
