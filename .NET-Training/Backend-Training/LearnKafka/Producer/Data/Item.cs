using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Producer.Data
{
    public class Item
    {
        private readonly string[] Items = [ "Book", "Alarm Clock", "T-shirts", "Guitar", "Batteries" ];
        private readonly Random rnd = new();

        public string GetRandomItem()
        {
            return Items[rnd.Next(Items.Length)];
        }
    }
}
