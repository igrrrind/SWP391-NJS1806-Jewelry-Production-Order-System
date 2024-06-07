
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWP1.Helper;
using SWP.Interface;
using SWP.Repository;
using SWP1.Models;
using SWP1.Repositories;

namespace SWP1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(typeof(Mappers).Assembly);
            builder.Services.AddScoped<IDesign, DesignRepository>();
            builder.Services.AddScoped<IOrder, OrderRepository>();
            builder.Services.AddDbContext<JeweleryOrderProduction1Context>(
                options =>
     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); // Add this line
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
