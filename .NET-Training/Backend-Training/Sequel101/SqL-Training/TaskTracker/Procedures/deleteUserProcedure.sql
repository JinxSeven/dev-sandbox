CREATE OR ALTER PROCEDURE spDeleteUser
@user_id INT
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @user_id)
	BEGIN
		RAISERROR('User does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DELETE Users
		WHERE id = @user_id;
	END
END;