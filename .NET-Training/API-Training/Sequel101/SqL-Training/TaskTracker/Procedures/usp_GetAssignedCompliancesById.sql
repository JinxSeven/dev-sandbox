CREATE OR ALTER PROCEDURE usp_GetAssignedCompliancesById
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		comp.id AS Id,
		comp.comp_name AS ComplianceName,
		comp.comp_description AS ComplianceDescription,
		comp.req_percentage AS RequiredPercentage,
		comp.created_by AS CreatedBy,
		comp.created_date AS CreatedDate,
		(SELECT COUNT(*) FROM Questions qst WHERE qst.comp_id = comp.id) AS QuestionCount,
		usrcomp.assigned_date AS AssignedDate,
		usrcomp.is_complete AS IsComplete,
		usrcomp.completed_date AS CompletedDate,
		usrcomp.score AS ComplianceScore
		FROM Compliances comp
		JOIN UserCompliances usrcomp ON usrcomp.comp_id = comp.id
		WHERE usrcomp.user_id = @UserId;
END