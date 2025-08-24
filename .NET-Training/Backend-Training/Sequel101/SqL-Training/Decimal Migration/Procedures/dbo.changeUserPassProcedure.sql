CREATE PROCEDURE changeUserPassProcedure
@id INT,
@oldpass VARCHAR(255),
@newpass VARCHAR(255)
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS (SELECT 1 FROM Users usr WHERE usr.Id = @id AND usr.Password = @oldpass)
	BEGIN
        RAISERROR('Password does not match your records!', 16, 1)
        RETURN
    END
	UPDATE Users
	SET
    Password = @newpass
	WHERE Id = @id;
END;