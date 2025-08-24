IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Goals')
BEGIN
    CREATE TABLE Goals
    (
        Id INT IDENTITY(1, 1) PRIMARY KEY,
        UserId INT NOT NULL,
        Name VARCHAR(15) NOT NULL,
        Target DECIMAL(10, 2) NOT NULL,
        Amount DECIMAL(10, 2) DEFAULT 0,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END;

EXEC addGoalProcedure 
@user_id = 101, @name = 'expense',
@target = 2500, @amount = 250;
