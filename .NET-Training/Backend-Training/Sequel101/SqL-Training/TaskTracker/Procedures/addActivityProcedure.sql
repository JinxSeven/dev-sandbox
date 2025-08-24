CREATE OR ALTER PROCEDURE spAddActivity
@task_id INT,
@activity_title VARCHAR(50),
@description VARCHAR(200),
@hours DECIMAL(4, 2)
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		INSERT INTO Activities (taskId, activityTitle, description, hours)
		VALUES (@task_id, @activity_title, @description, @hours)
	END
END;