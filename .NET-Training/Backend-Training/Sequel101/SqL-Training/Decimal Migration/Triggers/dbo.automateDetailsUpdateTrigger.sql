CREATE TRIGGER automateDetailsUpdateTrigger
ON Transactions
AFTER INSERT
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT 1 FROM inserted WHERE Type = 'income')
		BEGIN
			UPDATE d
			SET d.Income = d.Income + i.Amount
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
		IF EXISTS (SELECT 1 FROM inserted WHERE Type = 'expense') 
		BEGIN
			UPDATE d
			SET d.Expense = d.Expense + i.Amount
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
		BEGIN
			UPDATE d
			SET d.TransactionCount = d.TransactionCount + 1
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
	END TRY
	BEGIN CATCH	
		PRINT 'automateDetailsUpdateTrigger: ' + ERROR_MESSAGE();
		THROW;
	END CATCH
END;