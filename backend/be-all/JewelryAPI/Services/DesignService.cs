using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class DesignService
    {
        private DesignRepository _repository;
        public Design GetDesignByOrderCustomId(int id)
        {
            _repository = new DesignRepository();
            return _repository.GetDesignByOrderCustomId(id);
        }
        public Design AddDesign(Design design)
        {
            _repository = new DesignRepository();
            return _repository.AddDesign(design);
        }
        public Design UpdateDesign(int id, Design design)
        {
            _repository = new DesignRepository();
            return _repository.UpdateDesign(id, design);
        }
        public void DeleteDesign(int id)
        {
            _repository = new DesignRepository();
            _repository.DeleteDesign(id);
        }
    }
}
