using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class GemstoneService
    {
        OriginalGemstoneRepository _repository = new OriginalGemstoneRepository();

        public List<Gemstone> GetAllGemstones()
        {
            return _repository.GetAllGemstones();
        }
    }
}
