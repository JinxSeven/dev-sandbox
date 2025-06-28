CREATE PROCEDURE getUserExpensesProcedure
@user_id INT
AS
BEGIN
	SET XACT_ABORT ON;
	IF EXISTS (SELECT 1 FROM Transactions WHERE UserId = @user_id)
	BEGIN
		SELECT *
		FROM Transactions
		WHERE UserId = @user_id AND Type = 'expense'
	END
	ELSE
	BEGIN
		RAISERROR('UserId invalid!', 16, 1)
	END
END;