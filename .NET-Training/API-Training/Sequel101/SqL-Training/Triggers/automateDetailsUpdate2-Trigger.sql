CREATE TRIGGER automateDetailsUpdate2Trigger
ON Transactions
AFTER DELETE
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT 1 FROM inserted i WHERE i.Type = 'income')
		BEGIN
			UPDATE d
			SET d.Income = d.Income - i.Amount
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId
		END
		IF EXISTS (SELECT 1 FROM inserted i WHERE i.Type = 'expense')
		BEGIN
			UPDATE d
			SET d.Income = d.Expense - i.Amount
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId
		END
		BEGIN
			UPDATE d
			SET d.TransactionCount = d.TransactionCount - 1
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
	END TRY
	BEGIN CATCH
		PRINT 'automateDetailsUpdate2Trigger: ' + ERROR_MESSAGE();
	END CATCH
END;