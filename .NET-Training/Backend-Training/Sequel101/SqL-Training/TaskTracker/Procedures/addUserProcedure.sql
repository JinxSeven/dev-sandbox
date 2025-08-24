CREATE PROCEDURE spAddUser
@user_name VARCHAR(25),
@email VARCHAR(50),
@password VARCHAR(255)
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS
	(
		SELECT 1 FROM Users 
		WHERE email = @email OR userName = @user_name
	)
	BEGIN
		INSERT INTO Users (userName, email, password)
		VALUES (@user_name, @email, @password);
	END
	ELSE
	BEGIN
		RAISERROR('Email or username already taken!', 16, 1);
		RETURN;
	END
END