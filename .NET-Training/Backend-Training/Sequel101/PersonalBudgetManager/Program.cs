
using BudgetTrackerApp.Server.Data;
using Microsoft.Extensions.DependencyInjection;
using PersonalBudgetManager.Data;

namespace BudgetTrackerApp.Server
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
            builder.Services.AddScoped<IDataAccess>(provider =>
            {
                var connStr = builder.Configuration.GetConnectionString("DBCon");
                return new DataAccess(connStr);
            });
            builder.Services.AddScoped<UserRepo>();
            builder.Services.AddScoped<TransactionRepo>();
            builder.Services.AddScoped<GoalRepo>();
            builder.Services.AddScoped<CategoryRepo>();

            var app = builder.Build();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true));


            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
