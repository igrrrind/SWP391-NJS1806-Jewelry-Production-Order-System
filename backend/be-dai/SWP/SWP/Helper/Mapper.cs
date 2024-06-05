using AutoMapper;
using SWP.Dto;
using SWP.Models;

namespace SWP.Helper
{
    public class Mapper :Profile
    {
        public Mapper()
        {
            CreateMap<Design, DesignDto>();

        }
    }
}
