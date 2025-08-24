CREATE PROCEDURE editGoalDataProcedure
@goal_id INT,
@name VARCHAR(15),
@target INT
AS
BEGIN
	IF @target <= 0
    BEGIN
        RAISERROR('Amount to add must be positive.', 16, 1);
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