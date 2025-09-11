using Confluent.Kafka;
using System;

using Producer.Models;
using System.Text.Json;
using Producer.Data;

namespace Producer;
class Producer
{
    static void Main(string[] args)
    {
        const string topic = "purchases";

        var config = new ProducerConfig
        {
            BootstrapServers = "kafka-cluster:9092",
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

                producer.Produce(topic, new Message<string, string> { Key = user, Value = itemData, Timestamp = dateTime },
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
