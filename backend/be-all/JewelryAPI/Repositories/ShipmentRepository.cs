using Repositories.Models;

namespace Repositories
{
    public class ShipmentRepository
    {
        private JeweleryOrderProductionContext?  _context = null;
        public ShipmentRepository() { }

        public Shipment? GetShipment(int id)
        {
            _context = new JeweleryOrderProductionContext();
            return _context.Shipments.FirstOrDefault(s => s.ShipmentId == id);
        }

        public Shipment AddShipment(Shipment shipment)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Shipments.Add(shipment);
            _context.SaveChanges();
            return shipment;
        }
    }
}
