CREATE FUNCTION dbo.fnGetUserTransactions (@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Transactions
    WHERE UserId = @user_id
);