CREATE OR ALTER PROCEDURE usp_InsertNewUser
@UserName NVARCHAR(255),
@UserEmail NVARCHAR(255),
@UserPassword NVARCHAR(255),
@UserRole NVARCHAR(50)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Users WHERE UserEmail = @UserEmail)
	BEGIN
		RAISERROR('User with email "%s" already exists!', 16, 1, @UserEmail)
		RETURN
	END
	BEGIN TRANSACTION
	DECLARE @InsertedUserId AS TABLE (UserId UNIQUEIDENTIFIER)
	BEGIN TRY
		INSERT INTO Users (UserName, UserEmail, UserPassword, UserRole)
		OUTPUT INSERTED.UserId INTO @InsertedUserId
		VALUES (@UserName, @UserEmail, @UserPassword, @UserRole);
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
	SELECT UserId FROM @InsertedUserId AS InsertedUserId
END;

DELETE FROM Users
WHERE UserName = 'string';