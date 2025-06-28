IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Activities')
BEGIN
    CREATE TABLE Activities
    (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		task_id UNIQUEIDENTIFIER NOT NULL,
		activity_title VARCHAR(50) NOT NULL,
		description VARCHAR(200) NOT NULL,
		hours DECIMAL(2, 2) NOT NULL
        FOREIGN KEY (task_id) REFERENCES Tasks(id) ON DELETE CASCADE
    );
END;