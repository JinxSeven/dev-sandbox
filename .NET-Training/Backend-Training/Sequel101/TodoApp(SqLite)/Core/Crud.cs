using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp
{
    internal class Crud
    {
        const string dbPath = "sqLite.db";

        public static async Task AddTask(string task)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    string addTaskQuery = "INSERT INTO Task_Table (Task, Status) " +
                        "VALUES (@Task, 0);";

                    using (var insertCmd = new SqliteCommand(addTaskQuery, db, transaction))
                    {
                        insertCmd.Parameters.AddWithValue("@Task", task);
                        await insertCmd.ExecuteNonQueryAsync();
                    }

                    await transaction.CommitAsync();
                }

                Console.WriteLine("Task added successfully!\n");
            }
        }

        public static async Task MarkComplete(int taskId)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    string markCompleteQuery = "UPDATE Task_Table SET Status = 1 WHERE Id = @TaskId;";
                    using (var updateCmd = new SqliteCommand(markCompleteQuery, db, transaction))
                    {
                        updateCmd.Parameters.AddWithValue("@TaskId", taskId);
                        int changedId = await updateCmd.ExecuteNonQueryAsync();

                        if (changedId != 0)
                        {
                            Console.WriteLine($"Task {taskId} updated!");
                        }
                        else
                        {
                            Console.WriteLine($"Task {taskId} not found!");
                        }
                    }
                    await transaction.CommitAsync();
                }
            }
        }

        public static async Task DisplayTasks()
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                string displayTableQuery = "SELECT * FROM Task_Table;";

                using (var displayCmd = new SqliteCommand(displayTableQuery, db))
                {
                    using (var reader = await displayCmd.ExecuteReaderAsync())
                    {
                        if (!reader.HasRows)
                        {
                            Console.WriteLine("\nNo tasks to show!");
                            return;
                        }
                        else Console.WriteLine();
                        while (reader.Read())
                        {
                            if (reader["Status"].ToString() == "0")
                            {
                                Console.Write($"{reader["Id"]}\t");
                                Console.Write($"{reader["Task"]}\t");
                                Console.Write($"Incomplete\n");
                            }
                            else
                            {
                                Console.Write($"{reader["Id"]}\t");
                                Console.Write($"{reader["Task"]}\t");
                                Console.Write($"Complete\n");
                            }
                        }
                    }
                }
            }
        }

        public static async Task UpdateTask(int taskId)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                string displayTaskQuery = "SELECT Task FROM Task_Table WHERE Id = @taskId;";

                using (var displayCmd = new SqliteCommand(displayTaskQuery, db))
                {
                    displayCmd.Parameters.AddWithValue("@taskId", taskId);

                    using (var reader = await displayCmd.ExecuteReaderAsync())
                    {
                        if (!reader.HasRows)
                        {
                            Console.WriteLine($"Task {taskId} not found!");
                            return;
                        }

                        while (await reader.ReadAsync())
                        {
                            Console.WriteLine($"Previous task name: {reader["Task"]}");
                        }
                    }
                }

                Console.Write("New task name: ");
                string newTask = Console.ReadLine()!;

                if (string.IsNullOrWhiteSpace(newTask))
                {
                    Console.WriteLine("\nNot a valid task name!");
                    return;
                }

                using (var transaction = db.BeginTransaction())
                {
                    string updateTaskQuery = "UPDATE Task_Table SET Task = @newTask WHERE Id = @taskId;";

                    using (var updateCmd = new SqliteCommand(updateTaskQuery, db, transaction))
                    {
                        updateCmd.Parameters.AddWithValue("@newTask", newTask);
                        updateCmd.Parameters.AddWithValue("@taskId", taskId);

                        int changedTask = await updateCmd.ExecuteNonQueryAsync();

                        if (changedTask != 0)
                        {
                            Console.WriteLine($"Renamed task {taskId}\n");
                        }
                    }
                    await transaction.CommitAsync();
                }
            }
        }
        public static async Task DeleteTask(int taskId)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    try
                    {
                        string deleteTaskQuery = "DELETE FROM Task_Table WHERE Id = @taskId;";

                        using (var deleteCmd = new SqliteCommand(deleteTaskQuery, db, transaction))
                        {
                            deleteCmd.Parameters.AddWithValue("@taskId", taskId);
                            int deletedRows = await deleteCmd.ExecuteNonQueryAsync();

                            if (deletedRows != 0)
                            {
                                Console.WriteLine($"\nDeleted task {taskId}");
                            }
                            else
                            {
                                Console.WriteLine($"\nTask {taskId} not found!");
                            }

                            await transaction.CommitAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error occurred: {ex.Message}");
                        await transaction.RollbackAsync();
                    }
                }
            }
        }
    }
}
