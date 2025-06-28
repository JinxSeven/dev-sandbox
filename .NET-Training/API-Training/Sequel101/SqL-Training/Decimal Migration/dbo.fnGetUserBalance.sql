CREATE FUNCTION dbo.fnGetUserBalance (@user_id INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN
	DECLARE @balance DECIMAL(10, 2);

	SELECT @balance = dtl.Balance
	FROM Details dtl
	WHERE dtl.UserId = @user_id;

	RETURN @balance;
END;