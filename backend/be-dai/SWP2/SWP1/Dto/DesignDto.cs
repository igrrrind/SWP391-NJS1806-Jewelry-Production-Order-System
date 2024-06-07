namespace SWP.Dto
{
    public class DesignDto
    {
        public int DesignId { get; set; }

        public int OrderCustomId { get; set; }

        public int OrderId { get; set; }

        public string Description { get; set; } = null!;

        public DateOnly DesignatedCompletion { get; set; }

        public bool IsCompleted { get; set; }

    }
}
