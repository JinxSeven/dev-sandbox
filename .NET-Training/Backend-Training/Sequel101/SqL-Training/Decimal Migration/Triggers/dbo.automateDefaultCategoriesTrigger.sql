CREATE TRIGGER automateDefaultCategoriesTrigger
ON Users
AFTER INSERT
AS
BEGIN
	DECLARE @id INT;
	SELECT @id = i.Id FROM inserted i;

	EXEC addExpenseCategoryProcedure @user_id = @id, @ecategory = 'wellbeing';
	EXEC addExpenseCategoryProcedure @user_id = @id, @ecategory = 'groceries';
	EXEC addExpenseCategoryProcedure @user_id = @id, @ecategory = 'transportation';
	EXEC addExpenseCategoryProcedure @user_id = @id, @ecategory = 'entertainment';
	EXEC addExpenseCategoryProcedure @user_id = @id, @ecategory = 'utilities';

	EXEC addIncomeCategoryProcedure @user_id = @id, @icategory = 'salary';
    EXEC addIncomeCategoryProcedure @user_id = @id, @icategory = 'bonus';
    EXEC addIncomeCategoryProcedure @user_id = @id, @icategory = 'freelancing';
    EXEC addIncomeCategoryProcedure @user_id = @id, @icategory = 'pension';
    EXEC addIncomeCategoryProcedure @user_id = @id, @icategory = 'interest';
END;