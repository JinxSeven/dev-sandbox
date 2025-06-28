/*CREATE PROCEDURE addGoalProcedure
@user_id INT,
@name VARCHAR(15),
@target INT,
@amount INT
AS
BEGIN
	INSERT INTO Goals 
	(UserId, Name, Target, Amount) VALUES (@user_id, @name, @target, @amount);
END;

EXEC addGoalProcedure 
@user_id = 101, @name = 'expense',
@target = 2500, @amount = 250;*/