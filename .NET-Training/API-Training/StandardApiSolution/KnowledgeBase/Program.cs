using KnowledgeBaseApi.Repo;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens.Experimental;
using System.Text;

namespace KnowledgeBaseApi;

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
        builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,

                    ValidAudience = builder.Configuration.GetValue<string>("Authentication:Audience"),
                    ValidIssuer = builder.Configuration.GetValue<string>("Authentication:Issuer"),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("Authentication:SecretKey")!))
                };
            });

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

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
