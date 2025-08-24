SELECT * FROM Users
SELECT * FROM Tasks
SELECT * FROM Activities

DELETE FROM Activities
DELETE FROM Tasks

EXEC spGetLoggedUser 'samuel.livingston', 'String101'

ALTER TABLE Activities
ALTER COLUMN hours DECIMAL(4,2);