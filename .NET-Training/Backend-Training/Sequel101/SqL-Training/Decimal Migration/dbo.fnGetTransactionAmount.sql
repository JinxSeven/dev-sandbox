CREATE FUNCTION dbo.fnGetTransactionAmount(@id INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @result DECIMAL(10, 2);

    SELECT @result = tr.Amount
    FROM Transactions tr
    WHERE Id = @id;

    RETURN @result;
END;