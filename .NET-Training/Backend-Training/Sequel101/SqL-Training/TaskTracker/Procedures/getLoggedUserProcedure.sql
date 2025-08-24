CREATE OR ALTER PROCEDURE spGetLoggedUser
@username VARCHAR(50),
@password VARCHAR(255)
AS

BEGIN
	IF EXISTS 
	(
		SELECT 1 FROM Users WHERE userName = @username
		AND password = @password
	)
	BEGIN
		SELECT * FROM Users WHERE userName = @username
		AND password = @password	
	END
	ELSE
	BEGIN
		RAISERROR('Invalid crentials', 16, 1);
		RETURN;
	END
END