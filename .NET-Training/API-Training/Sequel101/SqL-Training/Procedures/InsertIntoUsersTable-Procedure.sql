CREATE PROCEDURE addUserProcedure
    @email VARCHAR(50),
    @name VARCHAR(25),
    @password NVARCHAR(255)
AS
BEGIN
	SET XACT_ABORT ON;
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @email)
    BEGIN
        RAISERROR ('User with this email address already exists.', 16, 1)
        RETURN
    END
    INSERT INTO Users (Name, Email, Password) VALUES (@name, @email, @password);
END;