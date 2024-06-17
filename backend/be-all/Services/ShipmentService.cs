using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ShipmentService
    {
        private ShipmentRepository? repository = null;

        public ShipmentService() { }

        public Shipment? GetShipment(int id)
        {
            repository = new ShipmentRepository();
            return repository.GetShipment(id);
        }
        public Shipment AddShipment(Shipment shipment)
        {
            repository = new ShipmentRepository();
            return repository.AddShipment(shipment);
        }
    }
}
