CREATE PROCEDURE editTransactDataProcedure
    @transact_id INT,
    @type VARCHAR(8),
    @amount INT,
    @category VARCHAR(15),
    @date_and_time DATETIME
AS
BEGIN
    IF @amount <= 0
    BEGIN
        RAISERROR('Amount to add must be positive.', 16, 1);
        RETURN;
    END
    DECLARE @currentAmount INT;
	DECLARE @currentType VARCHAR;
    SET @currentAmount = dbo.fnGetTransactionAmount(@transact_id);
    SET @currentType = dbo.fnGetTransactionType(@transact_id);
        
    PRINT('Current Amount: ' + CAST(@currentAmount AS VARCHAR(10)));
    PRINT('Input Amount: ' + CAST(@amount AS VARCHAR(10)));
	PRINT('Current Type: ' + CAST(@currentType AS VARCHAR(10)));
    PRINT('Input Type: ' + CAST(@type AS VARCHAR(10)));

    UPDATE Transactions
    SET 
        Type = ISNULL(@type, Type),
        Amount = ISNULL(@amount, Amount),
        Category = ISNULL(@category, Category),
        DateTime = ISNULL(@date_and_time, DateTime)
    WHERE Id = @transact_id;

    IF (@type = 'income' AND @currentType = 'i')
    BEGIN
        PRINT('if income');
        IF @amount > @currentAmount
        BEGIN
            PRINT('@amount > dbo');
            UPDATE Details
            SET Income = Income + (@amount - @currentAmount)
            FROM Details AS dtl
            JOIN Transactions AS trs ON trs.UserId = dtl.UserId
            WHERE trs.Id = @transact_id;
        END
        ELSE IF @amount < @currentAmount
        BEGIN
            PRINT('@amount < dbo');
            UPDATE Details
            SET Income = Income - (@currentAmount - @amount)
            FROM Details AS dtl
            JOIN Transactions AS trs ON trs.UserId = dtl.UserId
            WHERE trs.Id = @transact_id;
        END
    END
    ELSE IF (@type = 'expense' AND @currentType = 'e')
    BEGIN
        PRINT('if expense');
        IF @amount > @currentAmount
        BEGIN
			PRINT('@amount > dbo');
            UPDATE Details
            SET Expense = Expense + (@amount - @currentAmount)
            FROM Details AS dtl
            JOIN Transactions AS trs ON trs.UserId = dtl.UserId
            WHERE trs.Id = @transact_id;
        END
        ELSE IF @amount < @currentAmount
        BEGIN
            PRINT('@amount < dbo');
			UPDATE Details
            SET Expense = Expense - (@currentAmount - @amount)
            FROM Details AS dtl
            JOIN Transactions AS trs ON trs.UserId = dtl.UserId
            WHERE trs.Id = @transact_id;
        END
    END
	IF (@type = 'income' AND @currentType = 'e')
	BEGIN
		UPDATE Details
        SET Expense = Expense - @currentAmount,
		Income = Income + @amount
        FROM Details AS dtl
        JOIN Transactions AS trs ON trs.UserId = dtl.UserId
        WHERE trs.Id = @transact_id;
	END
	ELSE IF (@type = 'expense' AND @currentType = 'i')
		BEGIN
		UPDATE Details
        SET Expense = Expense + @amount,
		Income = Income - @currentAmount
        FROM Details AS dtl
        JOIN Transactions AS trs ON trs.UserId = dtl.UserId
        WHERE trs.Id = @transact_id;
	END
END;