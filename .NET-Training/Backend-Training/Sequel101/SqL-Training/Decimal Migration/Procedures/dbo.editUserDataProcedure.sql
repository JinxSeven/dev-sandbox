CREATE PROCEDURE editUserDataProcedure
@id INT,
@name VARCHAR(25),
@email VARCHAR(50)
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS (SELECT 1 FROM Users WHERE Id = @id)
    BEGIN
        RAISERROR('User with the given Id does not exist!', 16, 1);
        RETURN;
    END
	IF EXISTS (SELECT 1 FROM Users usr WHERE usr.Email = @email AND usr.Id <> @id)
	BEGIN
        RAISERROR('Email address already exists in database!', 16, 1)
        RETURN
    END
	UPDATE Users
	SET
	Name = ISNULL(@name, Name),
    Email = ISNULL(@email, Email)
	WHERE Id = @id;
END;