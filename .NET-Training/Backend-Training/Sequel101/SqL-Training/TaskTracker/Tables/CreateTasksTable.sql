IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tasks')
BEGIN
    CREATE TABLE Tasks
    (
        id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		user_id UNIQUEIDENTIFIER NOT NULL,
		client_name VARCHAR(50) NOT NULL,
		project_name VARCHAR(50) NOT NULL,
		task_title VARCHAR(50) NOT NULL,
		hours DECIMAL(4, 2) NOT NULL,
        date_time DATETIME NOT NULL,
		assigned_to VARCHAR(50) NOT NULL, 
		assigned_by VARCHAR(50) NOT NULL,
		support_type VARCHAR(50),
		priority VARCHAR(25),
		description VARCHAR(200)
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    );
END;