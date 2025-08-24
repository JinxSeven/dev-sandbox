CREATE PROCEDURE usp_GetUserStatsById
    @UserId uniqueidentifier
AS
BEGIN
    -- Total Tasks Assigned
    DECLARE @TotalTasks INT;
    SELECT @TotalTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId;

    -- Task Status Breakdown
    DECLARE @NewTasks INT, @ActiveTasks INT, @CompletedTasks INT;
    SELECT @NewTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'New';

    SELECT @ActiveTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'Active';

    SELECT @CompletedTasks = COUNT(*)
    FROM Tasks
    WHERE user_id = @UserId AND task_state = 'Complete';

    DECLARE @NewTasksPercentage DECIMAL(5, 2), @ActiveTasksPercentage DECIMAL(5, 2), @CompletedTasksPercentage DECIMAL(5, 2);
    
    -- Handle division by zero for task percentages
    SET @NewTasksPercentage = CASE 
                                WHEN @TotalTasks = 0 THEN 0 
                                ELSE (CAST(@NewTasks AS DECIMAL) / @TotalTasks) * 100 
                              END;
    SET @ActiveTasksPercentage = CASE 
                                   WHEN @TotalTasks = 0 THEN 0 
                                   ELSE (CAST(@ActiveTasks AS DECIMAL) / @TotalTasks) * 100 
                                 END;
    SET @CompletedTasksPercentage = CASE 
                                      WHEN @TotalTasks = 0 THEN 0 
                                      ELSE (CAST(@CompletedTasks AS DECIMAL) / @TotalTasks) * 100 
                                    END;

    -- Assigned Compliances
    DECLARE @TotalCompliances INT, @CompletedCompliances INT;
    SELECT @TotalCompliances = COUNT(*)
    FROM UserCompliances
    WHERE user_id = @UserId;

    SELECT @CompletedCompliances = COUNT(*)
    FROM UserCompliances
    WHERE user_id = @UserId AND is_complete = 1;

    -- Total Hours Logged (All Time)
    DECLARE @TotalHoursLogged DECIMAL(10, 2);
    SELECT @TotalHoursLogged = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId;

    -- Total Hours Worked for the Week
    DECLARE @TotalHoursWorkedForWeek DECIMAL(10, 2);
    SELECT @TotalHoursWorkedForWeek = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId
      AND date_time >= DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0) -- Start of the week
      AND date_time < DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()) + 1, 0); -- End of the week

    -- Total Hours Worked for the Day
    DECLARE @TotalHoursWorkedForDay DECIMAL(10, 2);
    SELECT @TotalHoursWorkedForDay = ISNULL(SUM(hours), 0)
    FROM Tasks
    WHERE user_id = @UserId
      AND date_time >= CAST(GETDATE() AS DATE) -- Start of the day
      AND date_time < DATEADD(DAY, 1, CAST(GETDATE() AS DATE)); -- End of the day

    -- Output the results
    SELECT 
        @TotalTasks AS TotalTasks,
        @NewTasksPercentage AS NewTasksPercentage,
        @ActiveTasksPercentage AS ActiveTasksPercentage,
        @CompletedTasksPercentage AS CompletedTasksPercentage,
        @TotalCompliances AS TotalCompliances,
        @CompletedCompliances AS CompletedCompliances,
        @TotalHoursLogged AS TotalHoursLogged,
        @TotalHoursWorkedForWeek AS TotalHoursWorkedForWeek,
        @TotalHoursWorkedForDay AS TotalHoursWorkedForDay;
END;