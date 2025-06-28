CREATE FUNCTION dbo.fnGetUserGoals (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Goals
    WHERE UserId = @user_id
);