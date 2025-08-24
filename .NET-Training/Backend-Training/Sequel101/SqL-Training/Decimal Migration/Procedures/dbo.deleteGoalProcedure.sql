CREATE PROCEDURE deleteGoalProcedure
@goal_id INT
AS
BEGIN
    BEGIN TRY
		DELETE Goals
		WHERE Id = @goal_id;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred: ' + ERROR_MESSAGE();
		THROW;
	END CATCH
END;