using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Producer.Data;
using Producer.Models;
using System.Text.Json;

namespace Producer;
class Producer
{
    static void Main(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

        string topic = configuration.GetSection("KafkaConfigurations").GetValue<string>("Topic")!;

        var config = new ProducerConfig
        {
            BootstrapServers = configuration.GetSection("KafkaConfigurations").GetValue<string>("BootstrapServer")!,
            Acks = Acks.All
        };

        using (var producer = new ProducerBuilder<string, string>(config).Build())
        {
            var numProduced = 0;
            Random rnd = new Random();
            const int numMessages = 10;
            for (int i = 0; i < numMessages; ++i)
            {
                var user = User.GetRandomUser();
                var item = new PurchaseData
                {
                    ProductName = new Item().GetRandomItem()
                };

                string itemData = JsonSerializer.Serialize(item);
                var dateTime = new Timestamp(DateTime.UtcNow);
                var header = new Headers
                {
                    {"eventType", System.Text.Encoding.UTF8.GetBytes("Purchase")}
                };

                producer.Produce(topic, new Message<string, string> { Key = user, Value = itemData, Timestamp = dateTime,  Headers = header },
                    (deliveryReport) =>
                    {
                        if (deliveryReport.Error.Code != ErrorCode.NoError)
                        {
                            Console.WriteLine($"Failed to deliver message: {deliveryReport.Error.Reason}");
                        }
                        else
                        {
                            Console.WriteLine($"Produced event to topic {topic}: key = {user} | value = {item}");
                            numProduced += 1;
                        }
                    });
            }

            producer.Flush(TimeSpan.FromSeconds(10));
            Console.WriteLine($"{numProduced} messages were produced to topic {topic}");
        }
    }
}
