IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Transactions')
BEGIN
    CREATE TABLE Transactions
    (
        Id INT IDENTITY(1, 1) PRIMARY KEY,
        UserId INT NOT NULL,
        Type VARCHAR(8) NOT NULL,
        Amount DECIMAL(10, 2) NOT NULL CHECK (Amount > 0),
        Category VARCHAR(15) NOT NULL,
        DateTime DATETIME NOT NULL,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END;
