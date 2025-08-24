CREATE FUNCTION dbo.fnGetTransactionType(@id INT)
RETURNS VARCHAR(15)
AS
BEGIN
    DECLARE @result VARCHAR(15);

    SELECT @result = tr.Type
    FROM Transactions tr
    WHERE Id = @id;

    RETURN @result;
END;
