IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Details')
BEGIN
    CREATE TABLE Details
    (
        UserId INT NOT NULL PRIMARY KEY,
        Income DECIMAL(10, 2) DEFAULT 0,
        Expense DECIMAL(10, 2) DEFAULT 0,
        Balance DECIMAL(10, 2) DEFAULT 0,
        TransactionCount INT DEFAULT 0,
        GoalCount INT DEFAULT 0,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END;

EXEC addDetailProcedure
@user_id = 101, @income = 2500, @expense = 250;