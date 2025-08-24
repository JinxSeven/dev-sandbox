CREATE PROCEDURE deleteCategoryProcedure
@id INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Categories WHERE Id = @id)
    BEGIN
        DELETE FROM Categories
        WHERE Id = @id;
	END
	ELSE
    BEGIN
        RAISERROR('Invalid table option!', 16, 1);
    END
END