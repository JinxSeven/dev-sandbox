CREATE PROCEDURE editGoalDataProcedure
@goal_id INT,
@name VARCHAR(15),
@target DECIMAL(10, 2)
AS
BEGIN
	SET XACT_ABORT ON;
	DECLARE @contribution DECIMAL(10, 2);
	SELECT @contribution = gol.Amount
	FROM Goals gol WHERE gol.Id = @goal_id;
	IF @target <= 0
    BEGIN
        RAISERROR('Amount to add must be positive!', 16, 1);
        RETURN;
    END
	IF @target < @contribution
    BEGIN
        RAISERROR('Target cant recede contribution!', 16, 1);
        RETURN;
    END
	BEGIN
	UPDATE Goals
	SET
	Name = ISNULL(@name, Name),
	Target = ISNULL(@target, Target)
	WHERE Id = @goal_id;
	END
	IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('No changes made or goal not found!', 16, 1);
    END
END;