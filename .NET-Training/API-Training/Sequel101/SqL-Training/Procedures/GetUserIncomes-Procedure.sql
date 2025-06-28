/*CREATE PROCEDURE getUserIncomesProcedure
@user_id INT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Transactions t WHERE t.UserId = @user_id)
	BEGIN
	SELECT * FROM Transactions
	WHERE Type = 'income' AND UserId = @user_id
	END
	ELSE
	BEGIN
		RAISERROR('UserId invalid!', 16, 1)
	END
END;*/
