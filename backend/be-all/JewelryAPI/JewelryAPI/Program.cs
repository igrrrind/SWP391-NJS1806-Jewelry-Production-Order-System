
using Services;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
builder.Services.AddScoped<CustomerDetailService>();
builder.Services.AddScoped<QuoteService>();
builder.Services.AddScoped<ShipmentService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ProductionTrackingService>();
builder.Services.AddScoped<OrderCustomItemService>();
builder.Services.AddScoped<DesignService>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();   


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors("AllowAll"); // Enable CORS using the specified policy

app.MapControllers();

app.Run();
