/*CREATE PROCEDURE getUserDetailsProcedure
@user_id INT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Details WHERE UserId = @user_id)
	BEGIN
		SELECT *
		FROM Details
		WHERE UserId = @user_id;
	END
	ELSE
	BEGIN
		RAISERROR('UserId incorrect!', 16, 1);
	END
END;

EXEC getUserDetailsProcedure @user_id = 101;*/