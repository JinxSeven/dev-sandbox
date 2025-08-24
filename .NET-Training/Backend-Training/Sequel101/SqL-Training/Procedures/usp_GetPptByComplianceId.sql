CREATE OR ALTER PROCEDURE usp_GetPptByComplianceId
	@CompId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
    ppt.id AS Id,
    ppt.file_name AS FileName,
    ppt.file_data AS FileData
	FROM Presentations ppt WHERE ppt.comp_id = @CompId;
END
