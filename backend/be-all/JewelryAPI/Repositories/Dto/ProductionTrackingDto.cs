namespace Repositories.Dto;

public class ProductionTrackingDto
{
    public int ProductionId { get; set; }

    public int OrderId { get; set; }

    public DateOnly StartDate { get; set; }

    public int ProductionStatusId { get; set; }

    public string? ProductionStatusName { get; set; }

}