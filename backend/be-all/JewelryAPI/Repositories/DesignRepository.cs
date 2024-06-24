using Repositories.Dto;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class DesignRepository
    {
        private JeweleryOrderProductionContext _context;
        public Design GetDesignByOrderCustomId(int id)
        {
            _context = new JeweleryOrderProductionContext();
            return _context.Designs.FirstOrDefault(d => d.OrderCustomId == id);
        }
        public Design AddDesign(Design design)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Designs.Add(design);
            _context.SaveChanges();
            return design;
        }
        public Design UpdateDesign (int id, Design design)
        {
            _context = new JeweleryOrderProductionContext();
            Design oDesign = GetDesignByOrderCustomId(id);
            if (oDesign != null)
            {
                oDesign.Description = design.Description;
                oDesign.DesignatedCompletion = design.DesignatedCompletion;
                oDesign.IsCompleted = design.IsCompleted;
                _context.SaveChanges();
            }
            return oDesign;
        }
        public void DeleteDesign(int id)
        {
            _context = new JeweleryOrderProductionContext();
            Design oDesign = GetDesignByOrderCustomId(id);
            DesignImage? oImage = _context.DesignImages.FirstOrDefault(i => i.DesignId == oDesign.DesignId);
            if (oImage != null)
            {
                _context.DesignImages.Remove(oImage);
            }
            if (oDesign != null)
            {
                _context.Designs.Remove(oDesign);
            }
            _context.SaveChanges();
        }
    }
}
