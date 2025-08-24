CREATE PROCEDURE spDeleteTask
@task_id INT
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id =  @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DELETE Tasks
		WHERE id = @task_id;
	END
END;