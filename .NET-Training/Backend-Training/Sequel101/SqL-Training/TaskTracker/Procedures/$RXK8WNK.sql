CREATE PROCEDURE usp_GetUserTaskStats
AS
BEGIN
    WITH TaskSummary AS (
        SELECT 
            user_id, 
            COUNT(*) AS total_tasks,
            SUM(CASE WHEN task_state = 'new' THEN 1 ELSE 0 END) AS new_tasks,
            SUM(CASE WHEN task_state = 'complete' THEN 1 ELSE 0 END) AS complete_tasks,
            SUM(CASE WHEN task_state = 'active' THEN 1 ELSE 0 END) AS active_tasks
        FROM Tasks
        GROUP BY user_id
    )
    SELECT 
        U.username, 
        U.email, 
        U.is_admin, 
        ISNULL(T.user_id, U.id) AS user_id, -- Use user ID from Users table if no tasks exist
        ISNULL(T.total_tasks, 0) AS total_tasks, -- Default to 0 if no tasks
        ISNULL((T.new_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS new_percentage, -- Handle division by zero
        ISNULL((T.complete_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS complete_percentage, -- Handle division by zero
        ISNULL((T.active_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS active_percentage -- Handle division by zero
    FROM Users U
    LEFT JOIN TaskSummary T ON U.id = T.user_id; -- Include all users, even those with no tasks
END;