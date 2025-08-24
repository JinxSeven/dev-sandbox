CREATE FUNCTION fnGetUserTasks (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Tasks
    WHERE userId = @user_id
);