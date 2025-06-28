CREATE PROCEDURE editUserDataProcedure
@id INT,
@name VARCHAR(25),
@email VARCHAR(50)
AS
BEGIN
	SET XACT_ABORT ON;
	IF EXISTS (SELECT 1 FROM Users usr WHERE usr.Email = @email AND usr.Id <> @id)
	BEGIN
        RAISERROR('Email address already exists in database!', 16, 1)
        RETURN
    END
	UPDATE Users
	SET
	Name = ISNULL(@name, Name),
    Email = ISNULL(@email, Email)
END;