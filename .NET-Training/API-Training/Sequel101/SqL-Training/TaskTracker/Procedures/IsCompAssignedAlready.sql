CREATE OR ALTER PROCEDURE usp_IsComplianceAlreadyAssigned
@user_id UNIQUEIDENTIFIER,
@comp_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON; -- Prevents returning the number of rows affected

    IF EXISTS (SELECT 1 FROM UserCompliances WHERE user_id = @user_id AND comp_id = @comp_id)
    BEGIN
        SELECT 1;
    END
    ELSE
    BEGIN
        SELECT 0;
    END
END;


DECLARE @result INT;

EXEC @result = usp_IsComplianceAlreadyAssigned
    @user_id = '14ddc7d9-b880-48fb-a24e-4af9b5f77e08', -- Replace with your actual user GUID
    @comp_id = '40f38e63-e0af-4904-85ba-ee88810931d6'; -- Replace with your actual compliance GUID

SELECT @result;