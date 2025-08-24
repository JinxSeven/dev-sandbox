CREATE PROCEDURE addGoalContributionProcedure
@goal_id INT,
@amount_to_add DECIMAL(10, 2)
AS
BEGIN
	SET XACT_ABORT ON;
	IF @amount_to_add <= 0
    BEGIN
        RAISERROR('Amount to add must be positive.', 16, 1);
        RETURN;
    END
	BEGIN
	UPDATE Goals
	SET Amount =
		CASE
			WHEN Amount + @amount_to_add > Target THEN Amount
			ELSE Amount + @amount_to_add
		END
	WHERE Id = @goal_id;
	END
	IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('No changes made or goal not found!', 16, 1);
		RETURN;
    END
	BEGIN
	UPDATE Details
    SET Expense = Expense + @amount_to_add
    FROM Details dtl
    JOIN Goals gls ON gls.UserId = dtl.UserId
    WHERE gls.Id = @goal_id; 
	END
END;