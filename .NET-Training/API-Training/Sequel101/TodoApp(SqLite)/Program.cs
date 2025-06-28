using Microsoft.Data.Sqlite;
using SQLitePCL;

namespace TodoApp.Models
{
    internal class Program
    {
        const string dbPath = "sqLite.db";

        public static async Task Main(string[] args)
        {
            Console.WriteLine("TO-DO Console Application");
            int input = -1;

            do
            {
                Console.WriteLine("1) Add a new task");
                Console.WriteLine("2) Mark task complete");
                Console.WriteLine("3) Display all tasks");
                Console.WriteLine("4) Edit task");
                Console.WriteLine("5) Delete task");
                Console.WriteLine("6) Exit App");
                Console.Write("Option: ");

                try
                {
                    input = Convert.ToInt16(Console.ReadLine());
                }
                catch (FormatException ex)
                {
                    Console.WriteLine($"{ex.Message}");
                    continue;
                }

                if (input < 1 || (input > 6 && input != 6))
                {
                    Console.WriteLine($"Not an option!");
                    continue;
                }

                if (input != 6)
                    await ConnectSQLite();

                switch (input)
                {
                    case 1:
                        Console.Write("\nNew task name: ");
                        string task = Console.ReadLine()!;

                        if (string.IsNullOrWhiteSpace(task))
                        {
                            Console.WriteLine("\nNot a valid task name!");
                            break;
                        }

                        await Crud.AddTask(task);
                        break;
                    case 2:
                        Console.Write("Task Id to mark complete: ");
                        int taskId = Convert.ToInt16(Console.ReadLine());
                        await Crud.MarkComplete(taskId);
                        break;
                    case 3:
                        await Crud.DisplayTasks();
                        Console.WriteLine();
                        break;
                    case 4:
                        Console.Write($"\nTask Id to Edit complete: ");
                        taskId = Convert.ToInt16(Console.ReadLine());
                        await Crud.UpdateTask(taskId);
                        break;
                    case 5:
                        Console.Write($"\nTask Id to Edit complete: ");
                        taskId = Convert.ToInt16(Console.ReadLine());
                        await Crud.DeleteTask(taskId);
                        break;
                    case 6:
                        Console.WriteLine("\nClosing app...");
                        break;
                }
            }
            while (input != 6);
        }

        public static async Task ConnectSQLite()
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    string query = "CREATE TABLE IF NOT EXISTS Task_Table (" +
                        "Id INTEGER PRIMARY KEY," +
                        "Task TEXT, " +
                        "Status INTEGER CHECK(Status IN (0, 1)));";

                    using (var createTableCmd = new SqliteCommand(query, db, transaction))
                    {
                        await createTableCmd.ExecuteNonQueryAsync();
                    }

                    await transaction.CommitAsync();
                }
            }
        }
    }
}
