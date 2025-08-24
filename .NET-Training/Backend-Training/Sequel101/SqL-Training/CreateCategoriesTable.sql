IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'IncomeCategs')
BEGIN
	CREATE TABLE IncomeCategs
	(
		Id INT IDENTITY(1, 1) PRIMARY KEY,
		UserId INT NOT NULL,
		Category VARCHAR(25),
		FOREIGN KEY (UserId) REFERENCES Users(Id)
	);
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'ExpenseCategs')
BEGIN
	CREATE TABLE ExpenseCategs
	(
		Id INT IDENTITY(1, 1) PRIMARY KEY,
		UserId INT NOT NULL,
		Category VARCHAR(25),
		FOREIGN KEY (UserId) REFERENCES Users(Id)
	);
END;