CREATE TRIGGER automateAddDetailsTrigger
ON Users
AFTER INSERT
AS
BEGIN
	BEGIN TRY
		INSERT INTO Details (UserId, Expense, Income, Balance, TransactionCount, GoalCount)
		SELECT i.Id, 0, 0, 0, 0, 0 FROM inserted i;
	END TRY
	BEGIN CATCH
		PRINT 'automateAddDetailsTrigger: ' + ERROR_MESSAGE();
	END CATCH
END;