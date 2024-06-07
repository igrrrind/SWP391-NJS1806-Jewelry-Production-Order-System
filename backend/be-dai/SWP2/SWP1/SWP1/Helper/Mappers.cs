using AutoMapper;
using SWP.Dto;
using SWP1.Dto;
using SWP1.Models;


namespace SWP1.Helper
{

    public class Mappers :Profile
    {
        public Mappers()
        {
            CreateMap<Design, DesignDto>();
            CreateMap<DesignDto, Design>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderDto, Order>();
           
        }
    }
}
