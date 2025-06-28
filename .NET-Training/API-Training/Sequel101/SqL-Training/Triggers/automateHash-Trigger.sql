CREATE TRIGGER automatePasswordHashTrigger
ON Users 
AFTER INSERT
AS
BEGIN
	BEGIN TRY
		UPDATE Users
		SET Password = HASHBYTES('SHA2_256', i.Password)
		FROM Users
		INNER JOIN inserted i ON Users.Id = i.Id
	END TRY
	BEGIN CATCH
		PRINT 'automatePasswordHashTrigger: ' + ERROR_MESSAGE();
	END CATCH
END;