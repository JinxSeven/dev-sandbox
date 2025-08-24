CREATE PROCEDURE addTransactionProcedure
@user_id INT,
@type VARCHAR(8),
@amount DECIMAL(10, 2),
@category VARCHAR(15),
@date_and_time DATETIME
AS
BEGIN
	SET XACT_ABORT ON;
	IF @amount <= 0
    BEGIN
        RAISERROR('Amount must be positive!', 16, 1);
        RETURN;
    END
	DECLARE @balance DECIMAL(10, 2)
	SET @balance = dbo.fnGetUserBalance (@user_id);
	IF @type = 'expense'
		IF @amount > @balance
		    BEGIN
				RAISERROR('Expence cant exceed balance!', 16, 1);
				RETURN;
			END
	INSERT INTO Transactions 
	(UserId, Type, Amount, Category, DateTime)
	VALUES (@user_id, @type, @amount, @category, @date_and_time);
END;