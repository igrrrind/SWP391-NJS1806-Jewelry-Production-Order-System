using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class MetalService
    {
        private OriginalMetalRepository _repository = new OriginalMetalRepository();

        public List<Metal> GetAllMetals()
        {
            return _repository.GetAllMetals();
        }
    }
}
