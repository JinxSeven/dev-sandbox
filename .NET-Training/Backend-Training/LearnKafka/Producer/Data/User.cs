using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Producer.Data
{
    static class User
    {
        private static readonly string[] Users = ["Samuel", "Lucia", "Rose", "Raelyn", "Alice", "Japes"];
        private static readonly Random rnd = new Random();

        public static string GetRandomUser()
        {
            return Users[rnd.Next(Users.Length)];
        }
    }
}
