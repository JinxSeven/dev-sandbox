/*CREATE FUNCTION dbo.fnGetUserDetails (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT 
		usr.Name,
		usr.Email,
		dtl.Income,
		dtl.Expense,
		dtl.Balance,
		dtl.TransactionCount,
		dtl.GoalCount
    FROM Details dtl
	JOIN Users usr ON dtl.UserId = usr.Id
    WHERE dtl.UserId = @user_id
);

GO
CREATE FUNCTION dbo.fnGetUserTransactions (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Transactions
    WHERE UserId = @user_id
);

GO
CREATE FUNCTION dbo.fnGetUserExpenses (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Transactions
    WHERE UserId = @user_id AND Type = 'expense'
);

GO
CREATE FUNCTION dbo.fnGetUserIncomes (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Transactions
    WHERE UserId = @user_id AND Type = 'income'
);

GO
CREATE FUNCTION dbo.fnGetUserGoals (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Goals
    WHERE UserId = @user_id
);*/

GO
CREATE FUNCTION dbo.fnGetUserCategories (@user_id INT)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM Categories
	WHERE UserId = @user_id
);