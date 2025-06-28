CREATE OR ALTER PROC usp_HasDuplicate
    @TableName NVARCHAR(128),
    @ColumnName NVARCHAR(128),
    @InputString NVARCHAR(MAX),
    @IsDuplicate BIT OUTPUT
AS
BEGIN
    -- Declare a variable to hold the dynamic SQL query
    DECLARE @SQLQuery NVARCHAR(MAX)

    -- Construct the dynamic SQL query
    SET @SQLQuery = N'SELECT @IsDuplicate = CASE WHEN EXISTS (
                          SELECT 1 
                          FROM ' + QUOTENAME(@TableName) + '
                          WHERE ' + QUOTENAME(@ColumnName) + ' = @InputString
                      ) THEN 1 ELSE 0 END'

    -- Execute the dynamic SQL query
    EXEC sp_executesql @SQLQuery, 
                       N'@InputString NVARCHAR(MAX), @IsDuplicate BIT OUTPUT', 
                       @InputString, @IsDuplicate OUTPUT
END