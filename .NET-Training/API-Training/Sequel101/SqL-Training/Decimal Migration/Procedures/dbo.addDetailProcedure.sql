CREATE PROCEDURE addDetailProcedure
@user_id INT,
@income DECIMAL(10, 2),
@expense DECIMAL(10, 2)
AS
BEGIN
	INSERT INTO Details
	(UserId, Income, Expense) VALUES (@user_id, @income, @expense);
END;