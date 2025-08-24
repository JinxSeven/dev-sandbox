CREATE OR ALTER PROCEDURE [dbo].[usp_UpdateTaskState]
@id UNIQUEIDENTIFIER,
@task_state varchar(50)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Tasks WHERE id = @id)
	BEGIN
		UPDATE Tasks
			SET task_state = ISNULL(@task_state, task_state)
			WHERE id = @id;
	END
	ELSE
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
	END
END