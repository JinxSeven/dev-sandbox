CREATE PROCEDURE addCategoryProcedure
@user_id INT,
@inc_or_exp VARCHAR(10),
@category VARCHAR(25)
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS 
		(
			SELECT 1 FROM Categories cat
			WHERE cat.UserId = @user_id AND cat.Category = @category
		)
	BEGIN
		INSERT INTO Categories (UserId, Type,  Category)
		VALUES (@user_id, @inc_or_exp, @category)
	END
	ELSE
	BEGIN
		RAISERROR('Category already exist!', 16, 1);
		RETURN;
	END
END;