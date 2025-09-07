using Confluent.Kafka;
using System;

namespace Producer;
class Producer
{
    static void Main(string[] args)
    {
        const string topic = "purchases";

        string[] users = { "samuel", "lucia", "rose", "raelyn", "niko", "leo" };
        string[] items = { "book", "alarm clock", "t-shirts", "gift card", "batteries" };

        var config = new ProducerConfig
        {
            // User-specific properties that you must set
            BootstrapServers = "kafka-cluster:9092",

            // Fixed properties
            Acks = Acks.All
        };

        using (var producer = new ProducerBuilder<string, string>(config).Build())
        {
            var numProduced = 0;
            Random rnd = new Random();
            const int numMessages = 10;
            for (int i = 0; i < numMessages; ++i)
            {
                var user = users[rnd.Next(users.Length)];
                var item = items[rnd.Next(items.Length)];
                var dateTime = new Timestamp(DateTime.UtcNow);

                producer.Produce(topic, new Message<string, string> { Key = user, Value = item, Timestamp = dateTime },
                    (deliveryReport) =>
                    {
                        if (deliveryReport.Error.Code != ErrorCode.NoError)
                        {
                            Console.WriteLine($"Failed to deliver message: {deliveryReport.Error.Reason}");
                        }
                        else
                        {
                            Console.WriteLine($"Produced event to topic {topic}: key = {user,-5} value = {item}");
                            numProduced += 1;
                        }
                    });
            }

            producer.Flush(TimeSpan.FromSeconds(10));
            Console.WriteLine($"{numProduced} messages were produced to topic {topic}");
        }
    }
}
