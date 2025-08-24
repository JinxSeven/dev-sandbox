CREATE TABLE Notifications (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL, -- The user to whom the notification is sent
    message NVARCHAR(500) NOT NULL, -- The notification message
    created_date DATETIME DEFAULT GETDATE(), -- Timestamp of the notification
    is_read BIT DEFAULT 0, -- Flag to indicate if the notification has been read
    source_type NVARCHAR(50) NOT NULL, -- Source of the notification (e.g., 'Compliance', 'Task')
    source_id UNIQUEIDENTIFIER NOT NULL -- ID of the source record (e.g., Compliance.id or Tasks.id)
);

GO

CREATE OR ALTER TRIGGER trg_AfterInsertCompliance
ON Compliances
AFTER INSERT
AS
BEGIN
    DECLARE @comp_id UNIQUEIDENTIFIER;
    DECLARE @comp_name NVARCHAR(200);
    DECLARE @created_by NVARCHAR(100);

    -- Get the details of the newly inserted compliance
    SELECT 
        @comp_id = id,
        @comp_name = comp_name,
        @created_by = created_by
    FROM inserted;

    -- Insert a notification for the assigned user
    INSERT INTO Notifications (user_id, message, source_type, source_id)
    VALUES (
        @created_by, -- Assuming created_by is the user_id
        'New compliance assigned: ' + @comp_name, -- Notification message
        'Compliance', -- Source type
        @comp_id -- Source ID (Compliance.id)
    );
END;

GO

CREATE OR ALTER TRIGGER trg_AfterInsertTask
ON Tasks
AFTER INSERT
AS
BEGIN
    DECLARE @task_id UNIQUEIDENTIFIER;
    DECLARE @task_title VARCHAR(50);
    DECLARE @assigned_to VARCHAR(50);

    -- Get the details of the newly inserted task
    SELECT 
        @task_id = id,
        @task_title = task_title,
        @assigned_to = assigned_to
    FROM inserted;

    -- Insert a notification for the assigned user
    INSERT INTO Notifications (user_id, message, source_type, source_id)
    VALUES (
        @assigned_to, -- Assuming assigned_to is the user_id
        'New task assigned: ' + @task_title, -- Notification message
        'Task', -- Source type
        @task_id -- Source ID (Tasks.id)
    );
END;