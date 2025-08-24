/*CREATE PROCEDURE getUserTransactionsProcedure
@user_id INT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Transactions WHERE UserId = @user_id)
	BEGIN
		SELECT *
		FROM Transactions
		WHERE UserId = @user_id
	END
	ELSE
	BEGIN
		RAISERROR('UserId invalid!', 16, 1)
	END
END;

EXEC getUserTransactionsProcedure @user_id = 101;*/

/*CREATE PROCEDURE getUserExpensesProcedure
@user_id INT
AS
BEGIN
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

EXEC getUserExpensesProcedure @user_id = 103;*/

/*CREATE PROCEDURE getUserIncomesProcedure
@user_id INT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Transactions WHERE UserId = @user_id)
	BEGIN
		SELECT *
		FROM Transactions
		WHERE UserId = @user_id AND Type = 'income'
	END
	ELSE
	BEGIN
		RAISERROR('UserId invalid!', 16, 1)
	END
END;*/