CREATE FUNCTION dbo.fnGetUserIncCategs (@user_id INT)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM IncomeCategs
	WHERE UserId = @user_id
);
GO
CREATE FUNCTION dbo.fnGetUserExpCategs (@user_id INT)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM ExpenseCategs
	WHERE UserId = @user_id
);