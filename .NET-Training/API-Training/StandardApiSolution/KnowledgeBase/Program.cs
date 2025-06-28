
using TaskTracker.Data;
using TaskTracker.Repo;

namespace TaskTracker
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
                var connStr = builder.Configuration.GetConnectionString("DBConn");
                return new DataAccess(connStr);
            });
            builder.Services.AddScoped<UsersRepo>();
            builder.Services.AddScoped<TasksRepo>();
            builder.Services.AddScoped<ActivitiesRepo>();
            builder.Services.AddScoped<ClientRepo>();
            builder.Services.AddScoped<ProjectRepo>();
            builder.Services.AddScoped<ComplianceRepo>();

            var app = builder.Build();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true));

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
