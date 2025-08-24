CREATE TRIGGER automateDetailsUpdate4Trigger
ON Goals
AFTER DELETE
AS
BEGIN
	BEGIN TRY
	BEGIN
        UPDATE d
        SET d.Expense = d.Expense - dg.Amount
        FROM Details d
        JOIN deleted dg ON d.UserId = dg.UserId;
	END
	BEGIN
        UPDATE d
        SET d.GoalCount = d.GoalCount - 1
        FROM Details d
        JOIN deleted dg ON d.UserId = dg.UserId;
	END
	END TRY
	BEGIN CATCH	
		PRINT 'automateDetailsUpdate4Trigger: ' + ERROR_MESSAGE();
	END CATCH
END;
