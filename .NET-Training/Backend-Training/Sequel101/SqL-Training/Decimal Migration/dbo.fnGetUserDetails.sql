CREATE FUNCTION dbo.fnGetUserDetails (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT
	usr.Name, usr.Email,
	dtl.Income, dtl.Expense, dtl.Balance,
	dtl.TransactionCount, dtl.GoalCount
    FROM Details dtl
	JOIN Users usr ON dtl.UserId = usr.Id
    WHERE dtl.UserId = @user_id
);