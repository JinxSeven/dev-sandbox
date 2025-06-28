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
        U.username, U.email, T.user_id,
        T.total_tasks,
        (T.new_tasks * 100.0 / T.total_tasks) AS NewPercentage,
        (T.complete_tasks * 100.0 / T.total_tasks) AS CompletePercentage,
        (T.active_tasks * 100.0 / T.total_tasks) AS ActivePercentage
    FROM TaskSummary T JOIN Users AS U ON U.id = T.user_id;
END;