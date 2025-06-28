CREATE PROCEDURE deleteTransactionProcedure
@transact_id INT
AS
BEGIN
	BEGIN TRY
		DELETE FROM Transactions
		WHERE Id = @transact_id;
	END TRY
	BEGIN CATCH
		PRINT 'deleteTransactionProcedure: ' + ERROR_MESSAGE();
		THROW;
	END CATCH
END;