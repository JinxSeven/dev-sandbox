CREATE TRIGGER automateBalanceUpdateTrigger
ON Details
AFTER UPDATE
AS
BEGIN
	BEGIN TRY
		UPDATE d
		SET d.Balance =
			CASE
				WHEN i.Income - i.Expense < 0 THEN 0
				ELSE i.Income - i.Expense
			END
		FROM Details d
		INNER JOIN inserted i ON d.UserId = i.UserId;
	END TRY
	BEGIN CATCH
		PRINT 'automateBalanceUpdateTrigger: ' + ERROR_MESSAGE();
	END CATCH
END;
	