CREATE PROCEDURE spEditActivity
@activity_id INT,
@activity_title VARCHAR(50),
@description VARCHAR(200),
@hours DECIMAL(2, 2)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Activities WHERE id = @activity_id)
	BEGIN
		RAISERROR('Activity does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		UPDATE Activities
		SET
			activityTitle = ISNULL(@activity_title, activityTitle),
			description = ISNULL(@description, description),
			hours = ISNULL(@hours, hours)
		WHERE id = @activity_id;
	END
END;