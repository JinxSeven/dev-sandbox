CREATE OR ALTER PROCEDURE usp_UpdateGameById
@GameId UNIQUEIDENTIFIER,
@GameName NVARCHAR(255),
@GameCategory NVARCHAR(25),
@GameDescription NVARCHAR(255),
@GamePrice DECIMAL(10, 2)
AS
BEGIN

	IF NOT EXISTS (SELECT 1 FROM Games WHERE GameId = @GameId)
	BEGIN
		RAISERROR('The game that you want to update does not exist!', 16, 1);
		RETURN;
	END
	BEGIN TRANSACTION
	BEGIN TRY
		UPDATE Games
		SET GameName = @GameName, GameCategory = @GameCategory,
			GameDescription = @GameDescription, GamePrice = @GamePrice
		WHERE GameId = @GameId;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION
		THROW;
	END CATCH
END;