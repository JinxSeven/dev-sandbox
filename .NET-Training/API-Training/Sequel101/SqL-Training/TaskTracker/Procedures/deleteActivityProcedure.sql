CREATE PROCEDURE spDeleteActivity
@activity_id INT
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Activities WHERE id = @activity_id)
	BEGIN
		RAISERROR('Activity does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DELETE Activities
		WHERE id = @activity_id;
	END
END;