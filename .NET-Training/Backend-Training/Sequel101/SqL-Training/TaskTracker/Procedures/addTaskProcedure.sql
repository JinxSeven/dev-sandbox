CREATE OR ALTER PROCEDURE spAddTask
@user_id INT,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(4, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@support_type VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200)
AS
BEGIN
	IF NOT EXISTS
	(
		SELECT 1 FROM Users WHERE id = @user_id 
	)
	BEGIN
		RAISERROR('User does not exist!', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		INSERT INTO Tasks 
		( 
			userId, clientName, projectName,
			taskTitle, hours, dateTime,
			assignedTo, assignedBy, supportType,
			priority, description
		)
		VALUES
		(
			@user_id, @client_name, @project_name,
			@task_title, @hours, @date_time,
			@assigned_to, @assigned_by, @support_type,
			@priority, @description
		)

		SELECT SCOPE_IDENTITY() AS addedTaskId;
	END
END;