CREATE PROCEDURE addIncomeCategoryProcedure
@user_id INT,
@icategory VARCHAR(25)
AS
BEGIN
	INSERT INTO IncomeCategs (UserId, Category)
	VALUES (@user_id, @icategory)
END;
GO
CREATE PROCEDURE addExpenseCategoryProcedure
@user_id INT,
@ecategory VARCHAR(25)
AS
BEGIN
	INSERT INTO ExpenseCategs (UserId, Category)
    VALUES (@user_id, @ecategory);
END;