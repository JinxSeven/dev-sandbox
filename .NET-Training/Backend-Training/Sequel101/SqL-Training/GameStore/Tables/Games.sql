--CREATE TABLE Games 
--	(
--		GameId UNIQUEIDENTIFIER DEFAULT NEWID(),
--		GameName NVARCHAR(255) NOT NULL,
--		GameCategory VARCHAR(25) NOT NULL,
--		GameDescription NVARCHAR(255) NOT NULL,
--		GamePrice DECIMAL(10, 2) NOT NULL,
--		GameCreatedDate DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()
--	);

ALTER TABLE Users
ADD CONSTRAINT PK_Users_UserId PRIMARY KEY (UserId);
ADD CONSTRAINT DF_Users_UserId DEFAULT NEWID() FOR UserId;
ALTER COLUMN UserId UNIQUEIDENTIFIER NOT NUll;
DROP CONSTRAINT DF_Users_UserId;

SELECT * FROM Games;
DROP TABLE Games;
TRUNCATE TABLE Games;

--INSERT INTO Games (GameName, GameCategory, GameDescription, GamePrice, GameCreatedDate)
--VALUES ('Grand Theft Auto V', 'Action-Adventure', 'Experience the intertwined lives of three criminals in a thrilling open-world adventure.', 29.99, SYSDATETIMEOFFSET());

--INSERT INTO Games (GameId, GameName, GameCategory, GameDescription, GamePrice, GameCreatedDate)
--VALUES (NEWID(), 'Black Myth: Wukong', 'Action RPG', 'An action RPG based on the classic Chinese novel Journey to the West, featuring stunning visuals and intense combat.', 49.99, SYSDATETIMEOFFSET());

--INSERT INTO Games (GameId, GameName, GameCategory, GameDescription, GamePrice, GameCreatedDate)
--VALUES (NEWID(), 'Red Dead Redemption 2', 'Action-Adventure', 'An epic tale of outlaw Arthur Morgan and the Van der Linde gang in 1899 America.', 59.99, SYSDATETIMEOFFSET());

--INSERT INTO Games (GameId, GameName, GameCategory, GameDescription, GamePrice, GameCreatedDate)
--VALUES (NEWID(), 'God of War Ragnarök', 'Action-Adventure', 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.', 69.99, SYSDATETIMEOFFSET());

--INSERT INTO Games (GameName, GameCategory, GameDescription, GamePrice)
--VALUES ('The Last of Us Part I', 'Action-Adventure/Survival horror', 'Experience the emotional storytelling and unforgettable characters of Joel and Ellie in a reimagined version of the acclaimed game.', 49.99);
