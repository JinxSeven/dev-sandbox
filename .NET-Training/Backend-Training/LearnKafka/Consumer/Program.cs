using System.Collections.Concurrent;
using Confluent.Kafka;

namespace Consumer
{
    public class Program
    {
        static void Main(string[] args)
        {
            const string topic = "purchases";

            ConsumerConfig config = new()
            {
                BootstrapServers = "kafka-cluster:9092",
                Acks = Acks.All
            };

            using (var consumer = new ConsumerBuilder<string, string>(config).Build())
            {

            }
        }
    }
}

