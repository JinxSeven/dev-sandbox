using System.Collections.Concurrent;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;

namespace Consumer
{
    public class Program
    {
        private readonly ConfigurationBuilder _configuration;

        public Program()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile()
        }
        static void Main(string[] args)
        {
            const string topic = "purchases";

            ConsumerConfig config = new()
            {
                BootstrapServers = "lenses-kafka-cluster:9092",
                Acks = Acks.All
            };

            using (var consumer = new ConsumerBuilder<string, string>(config).Build())
            {

            }
        }
    }
}

