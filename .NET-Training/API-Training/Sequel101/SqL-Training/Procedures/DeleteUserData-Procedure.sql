CREATE PROCEDURE deleteUserProcedure
@id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM Goals WHERE UserId = @id;
        DELETE FROM Transactions WHERE UserId = @id;
        DELETE FROM Details WHERE UserId = @id;
        DELETE FROM Users WHERE Id = @id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
