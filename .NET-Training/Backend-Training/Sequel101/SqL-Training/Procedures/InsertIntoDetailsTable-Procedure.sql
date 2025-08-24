/*CREATE PROCEDURE addDetailProcedure
@user_id INT,
@income INT,
@expense INT
AS
BEGIN
	INSERT INTO Details
	(UserId, Income, Expense) VALUES (@user_id, @income, @expense);
END;*/

EXEC addDetailProcedure
@user_id = 101, @income = 2500, @expense = 250;