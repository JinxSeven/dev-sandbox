CREATE PROCEDURE addGoalProcedure
@user_id INT,
@name VARCHAR(15),
@target DECIMAL(10, 2),
@amount DECIMAL(10, 2)
AS
BEGIN
	SET XACT_ABORT ON;
	IF @amount > @target
		BEGIN
			RAISERROR('Initial contribution greater than target!', 16, 1);
			RETURN;
		END
	INSERT INTO Goals 
	(UserId, Name, Target, Amount) VALUES (@user_id, @name, @target, @amount);
END;