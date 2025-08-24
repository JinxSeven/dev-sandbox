SELECT name AS procedure_name
FROM sys.objects
WHERE type_desc = 'SQL_STORED_PROCEDURE' AND name = 'procedureOne';

EXEC editUserDataProcedure
@name = 'Lucia Jason', @email = 'lucia.jason@gta6.com', 
@id = 101;

INSERT INTO Details VALUES (101, 250);

EXEC addTransactionProcedure 
@user_id = 102, @type = 'expense',
@amount = 5550, @category = 'travel', @date_and_time = '2024-11-03 08:25:00';

EXEC addTransactionProcedure 
@user_id = 106, @type = 'expense',
@amount = 2050, @category = 'food', @date_and_time = '2024-11-03 11:55:20';

EXEC addGoalProcedure 
@user_id = 2109, @name = 'Test-Goal1',
@target = 2500, @amount = 250;

SELECT *
FROM Transactions t
WHERE UserId = 102;

DELETE FROM Details;
DELETE FROM Transactions;
DELETE FROM Goals;
DELETE FROM Users;

EXEC getUserDetailsProcedure @user_id = 102;
EXEC getUserTransactionsProcedure @user_id = 110;
EXEC getUserExpensesProcedure @user_id = 110;
EXEC getUserIncomesProcedure @user_id = 110;

ALTER TABLE Users  
ADD employee_name string;  

EXEC sp_rename 'Transactions.Nth', 'Id', 'COLUMN';

SELECT * FROM dbo.fnGetUserTransactions(102);

SELECT * FROM Users;
EXEC deleteGoalProcedure @goal_id = 6;

UPDATE Details
SET Income = Income + (7000 - 6500)
FROM Details AS dtl
JOIN Transactions AS trs ON trs.UserId = dtl.UserId
WHERE trs.Id = 1007

SELECT * 
FROM Details AS dtl
JOIN Transactions AS trs ON trs.UserId = dtl.UserId
WHERE trs.Id = 1007;

EXEC addGoalContributionProcedure @goal_id = 1011,
@amount_to_add = 250;

EXEC deleteUserProcedure @id = 2109

SELECT * FROM Users;
SELECT * FROM Details;
SELECT * FROM Transactions;
SELECT * FROM Goals;
SELECT * FROM Categories;

DECLARE @result INT;
SET @result = dbo.fnGetTransactionAmount(1007);
PRINT @result;

EXEC addTransactionProcedure 
@user_id = 2109, @type = 'income',
@amount = 3700, @category = 'bonus', @date_and_time = '2021-11-03 11:55:20';

EXEC editTransactDataProcedure @transact_id = 2010,
@type = 'income',
@amount = 1500,
@category = 'bonus',
@date_and_time = 'Oct 18 2024 10:35PM';

SELECT * 
FROM Details;
SELECT * FROM Transactions;

ALTER TABLE Details ADD NewIncome DECIMAL(10, 2);
ALTER TABLE Details DROP COLUMN Income;

EXEC sp_rename 'Transactions.TransactionType', 'Type', 'COLUMN';
