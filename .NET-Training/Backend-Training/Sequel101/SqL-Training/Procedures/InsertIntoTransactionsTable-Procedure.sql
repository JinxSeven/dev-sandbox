CREATE PROCEDURE addTransactionProcedure
@user_id INT,
@type VARCHAR(8),
@amount INT,
@category VARCHAR(15),
@date_and_time DATETIME
AS
BEGIN
	SET XACT_ABORT ON;
	IF @amount <= 0
    BEGIN
        RAISERROR('Amount must be positive.', 16, 1);
        RETURN;
    END
	INSERT INTO Transactions 
	(UserId, Type, Amount, Category, DateTime)
	VALUES (@user_id, @type, @amount, @category, @date_and_time);
END;