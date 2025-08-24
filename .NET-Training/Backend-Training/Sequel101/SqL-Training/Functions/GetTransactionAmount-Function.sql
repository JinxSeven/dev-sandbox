CREATE FUNCTION dbo.fnGetTransactionAmount(@id INT)
RETURNS INT
AS
BEGIN
    DECLARE @result INT;

    SELECT @result = tr.Amount
    FROM Transactions tr
    WHERE Id = @id;

    RETURN @result;
END;
