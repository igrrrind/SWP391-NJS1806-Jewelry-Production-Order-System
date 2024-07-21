using Repositories.Dto;
using Repositories.Models;

namespace Repositories
{
    public class OrderCustomItemRepository
    {
        private JeweleryOrderProductionContext _context;

        public List<OrderCustomItemDto> GetAllOrderCustomItems()
        {
            _context = new JeweleryOrderProductionContext();
            var list = from o in _context.OrderCustomItems
                       join g in _context.Gemstones
                       on o.GemstoneId equals g.GemstoneId
                       join m in _context.Metals
                       on o.MetalId equals m.MetalId
                       join p in _context.ProductTypes 
                       on o.ProductTypeId equals p.ProductTypeId
                       join d in _context.Designs 
                       on o.OrderItemId equals d.OrderCustomId
                       select new OrderCustomItemDto()
                       {
                           OrderItemId = o.OrderItemId,
                           OrderId = o.OrderId,
                           ProductTypeId = o.ProductTypeId,
                           TypeName = p.TypeName,
                           GemstoneId = o.GemstoneId,
                           GemstoneType = g.GemstoneType,
                           GemstoneColor = g.Color,
                           MetalId = o.MetalId,
                           MetalTypeName = m.MetalTypeName,
                           Size = o.Size,
                           UnitPrice = o.UnitPrice,
                           RequestDescription = o.RequestDescription,
                           Quantity = o.Quantity,
                           DesignIsCompleted = d.IsCompleted,
                           Subtotal = o.Subtotal
                       };
            return list.ToList();
        }
        public OrderCustomItemDto GetOrderCustomItemByOrderId(int id)
        {
            _context = new JeweleryOrderProductionContext();
            var order = (from o in _context.OrderCustomItems
                         join g in _context.Gemstones
                         on o.GemstoneId equals g.GemstoneId
                         join m in _context.Metals
                         on o.MetalId equals m.MetalId
                         join p in _context.ProductTypes 
                         on o.ProductTypeId equals p.ProductTypeId
                         select new OrderCustomItemDto()
                         {
                             OrderItemId = o.OrderItemId,
                             OrderId = o.OrderId,
                             ProductTypeId = o.ProductTypeId,
                             TypeName = p.TypeName,
                             GemstoneId = o.GemstoneId,
                             GemstoneType = g.GemstoneType,
                             GemstoneColor = g.Color,
                             MetalId = o.MetalId,
                             MetalTypeName = m.MetalTypeName,
                             Size = o.Size,
                             UnitPrice = o.UnitPrice,
                             RequestDescription = o.RequestDescription,
                             Quantity = o.Quantity,
                             Subtotal = o.Subtotal
                         }).FirstOrDefault(o => o.OrderId == id);
            return order;
        }
        public OrderCustomItem AddOrderCustomItem(OrderCustomItem order)
        {
            _context = new JeweleryOrderProductionContext();
            if (order != null)
            {
                _context.OrderCustomItems.Add(order);
                _context.SaveChanges();
            }
            return order;
        }
        public OrderCustomItem UpdateOrderCustomItem(int id, OrderCustomItem order)
        {
            _context = new JeweleryOrderProductionContext();
            var oOrder = _context.OrderCustomItems.FirstOrDefault(o => o.OrderItemId == id);
            if (order != null)
            {

                oOrder.UnitPrice = order.UnitPrice;
                oOrder.Quantity = order.Quantity;
                oOrder.Subtotal = order.Subtotal;
                oOrder.Size = order.Size;
                oOrder.GemstoneId = order.GemstoneId;
                oOrder.MetalId = order.MetalId;
                oOrder.ProductTypeId = order.ProductTypeId;
                oOrder.RequestDescription = order.RequestDescription;

                _context.SaveChanges();
            }
            return oOrder;
        }
        public void DeleteOrderCustomItem(int id)
        {
            _context = new JeweleryOrderProductionContext();
            var oOrder = _context.OrderCustomItems.FirstOrDefault(o => o.OrderItemId == id);
            var oDesign = _context.Designs.FirstOrDefault(d => d.OrderCustomId == id);
            var oRequest = _context.Requests.FirstOrDefault(r => r.OrderCustomId == id);
            if (oRequest != null)
            {
                _context.Remove(oRequest);
            }
            if (oDesign != null)
            {
                _context.Remove(oDesign);
            }
            if (oOrder != null)
            {
                _context.Remove(oOrder);
            }
            _context.SaveChanges();

        }
    }
}
