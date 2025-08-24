using DT.Catalog.Service.Repos;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDataAccess>(provide =>
{
    var dbConnStr = builder.Configuration.GetConnectionString("DBConn");
    Console.WriteLine(dbConnStr);
    return new DataAccess(new SqlConnection(dbConnStr));
});
builder.Services.AddScoped<UsersRepo>();
builder.Services.AddScoped<GamesRepo>();

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
