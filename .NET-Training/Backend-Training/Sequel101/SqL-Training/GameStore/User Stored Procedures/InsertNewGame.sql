CREATE OR ALTER PROCEDURE usp_InsertNewGame
@GameName NVARCHAR(255),
@GameCategory NVARCHAR(25),
@GameDescription NVARCHAR(255),
@GamePrice DECIMAL(10, 2)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Games WHERE GameName = @GameName)
	BEGIN
		RAISERROR('Game with the name "%s" already exists', 16, 1, @GameName);
		RETURN;
	END
	DECLARE @InsertedGameId TABLE (GameId UNIQUEIDENTIFIER);
	BEGIN TRANSACTION
	BEGIN TRY
		INSERT INTO Games
		(GameName, GameCategory, GameDescription, GamePrice)
		OUTPUT INSERTED.GameId INTO @InsertedGameId
		VALUES
		(@GameName, @GameCategory,@GameDescription, @GamePrice);
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION
		THROW;
	END CATCH
	SELECT GameId FROM @InsertedGameId AS InsertedGameId;
END;
