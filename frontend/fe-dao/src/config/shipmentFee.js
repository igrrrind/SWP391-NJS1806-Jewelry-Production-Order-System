export function calculateShipmentFeeByZone(zone) {
    if (zone.toLowerCase() === 'hồ chí minh') {
        return 0; // Free shipment for Ho Chi Minh
    }
    return 50000; // Flat rate for all other zones in VND
};