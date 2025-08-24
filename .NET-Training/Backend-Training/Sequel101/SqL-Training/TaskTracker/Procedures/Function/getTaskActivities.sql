CREATE FUNCTION fnGetUserActivities (@task_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Activities
    WHERE taskId = @task_id
);