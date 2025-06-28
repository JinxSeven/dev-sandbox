CREATE OR ALTER PROCEDURE usp_GetQuestionsByCompliancesId
	@CompId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
        q.id AS Id,
        q.comp_id AS ComplianceId,
        q.question_txt AS QuestionText,
        o.id AS OptionId,
        o.quest_id AS QuestionId_FK,
        o.option_txt AS OptionText,
        o.is_correct AS IsCorrect
    FROM Questions q
    LEFT JOIN Options o ON q.id = o.quest_id
    WHERE q.comp_id = @CompId
    ORDER BY q.id, o.id;
END
