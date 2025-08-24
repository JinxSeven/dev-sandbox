CREATE OR ALTER PROC usp_GetComplianceDetails
AS
BEGIN
	SELECT c.*,
		(SELECT COUNT(*) FROM Questions q WHERE q.comp_id = c.id) AS quest_count
	FROM Compliance c;
END