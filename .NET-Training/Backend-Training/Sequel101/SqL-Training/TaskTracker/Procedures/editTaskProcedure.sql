CREATE OR ALTER PROCEDURE spEditTask
@task_id INT,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(10, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@support_type VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		UPDATE Tasks
		SET
			clientName = ISNULL(@client_name, clientName),
			projectName = ISNULL(@project_name, projectName),
			taskTitle = ISNULL(@task_title, taskTitle),
			hours = ISNULL(@hours, hours),
			dateTime = ISNULL(@date_time, dateTime),
			assignedTo = ISNULL(@assigned_to, assignedTo),
			assignedBy = ISNULL(@assigned_by, assignedBy),
			supportType = ISNULL(@support_type, supportType),
			priority = ISNULL(@priority, priority),
			description = ISNULL(@description, description)
		WHERE id = @task_id;
	END
END;