CREATE TRIGGER detailsUpdateOnDeleteTransactTrigger
ON Transactions
AFTER DELETE
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM deleted del WHERE del.Type = 'income')
	BEGIN
        UPDATE d
        SET d.Income = d.Income - del.Amount
        FROM Details d
        JOIN deleted del ON d.UserId = del.UserId;
	END
	IF EXISTS (SELECT 1 FROM deleted del WHERE del.Type = 'expense')
	BEGIN
        UPDATE d
        SET d.Expense = d.Expense - del.Amount
        FROM Details d
        JOIN deleted del ON d.UserId = del.UserId;
	END
	BEGIN
        UPDATE d
        SET d.TransactionCount = d.TransactionCount - 1
        FROM Details d
        JOIN deleted del ON d.UserId = del.UserId;
	END
	END TRY
	BEGIN CATCH	
		PRINT 'automateDetailsUpdate5Trigger: ' + ERROR_MESSAGE();
	END CATCH
END;