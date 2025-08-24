CREATE TRIGGER automateDefaultCategoriesTrigger
ON Users
AFTER INSERT
AS
BEGIN
	DECLARE @id INT;
	SELECT @id = i.Id FROM inserted i;

	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'expense', @category = 'wellbeing';
	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'expense', @category = 'groceries';
	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'expense', @category = 'transportation';
	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'expense', @category = 'entertainment';
	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'expense', @category = 'utilities';

	EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'income', @category = 'salary';
    EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'income', @category = 'bonus';
    EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'income', @category = 'freelancing';
    EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'income', @category = 'pension';
    EXEC addCategoryProcedure @user_id = @id,
	@inc_or_exp = 'income', @category = 'business';
END;