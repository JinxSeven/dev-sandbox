CREATE TRIGGER automateDetailsUpdate3Trigger
ON Goals
AFTER INSERT
AS
BEGIN
	BEGIN TRY
		BEGIN
			UPDATE d
			SET d.Expense = d.Expense + i.Amount
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
		BEGIN
			UPDATE d
			SET d.GoalCount = d.GoalCount + 1
			FROM Details d
			JOIN inserted i ON d.UserId = i.UserId
			WHERE d.UserId = i.UserId;
		END
	END TRY
	BEGIN CATCH	
		PRINT 'automateDetailsUpdate3Trigger: ' + ERROR_MESSAGE();
	END CATCH
END;
