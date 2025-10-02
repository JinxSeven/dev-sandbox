using System.Collections.Concurrent;
using System.Text.Json;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Producer.Models;

namespace Consumer
{
    public class Program
    {
        static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            string topic = configuration.GetSection("KafkaConfigurations").GetValue<string>("Topic")!;

            ConsumerConfig config = new()
            {
                BootstrapServers = configuration.GetSection("KafkaConfigurations").GetValue<string>("BootstrapServer")!,
                Acks = Acks.All,

                GroupId = configuration.GetSection("KafkaConfigurations").GetValue<string>("GroupId"),
            };

            CancellationTokenSource cts = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) => {
                e.Cancel = true;
                cts.Cancel();
            };

            using (var consumer = new ConsumerBuilder<string, string>(config).Build())
            {
                consumer.Subscribe(topic);
                try
                {
                    while (true)
                    {
                        var consumerRes = consumer.Consume(cts.Token);
                        if (consumerRes != null)
                        {
                            PurchaseData purchaseData = JsonSerializer.Deserialize<PurchaseData>(consumerRes.Message.Value)!;
                            Console.WriteLine($"New order placed by {consumerRes.Message.Key}, for item {purchaseData.ProductName} at {consumerRes.Message.Timestamp.UtcDateTime}");
                        }
                        else
                        {
                            Console.Error.WriteLine("Something ain't right!");
                        }
                    }
                }
                catch(OperationCanceledException)
                {
                    Console.WriteLine("Shutting down...");
                }
                finally
                {
                    consumer.Close();
                    consumer.Dispose();
                }
            }
        }
    }
}

