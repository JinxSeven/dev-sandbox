IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users')
BEGIN
    CREATE TABLE Users
    (
        Id INT IDENTITY(101, 1) PRIMARY KEY,
        Name VARCHAR(25) NOT NULL,
        Email VARCHAR(50) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL
    );
END;