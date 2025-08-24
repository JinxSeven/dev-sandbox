ALTER PROCEDURE [dbo].[usp_AddCompliance]
    @comp_name NVARCHAR(200),
    @comp_description NVARCHAR(500),
    @req_percentage DECIMAL(5,2),
    @created_by NVARCHAR(100),
    @file_name NVARCHAR(255),
    @file_data VARBINARY(MAX),
    @questions NVARCHAR(MAX) -- JSON format
AS
BEGIN
    SET NOCOUNT ON;

    -- Declare necessary variables
    DECLARE @comp_id UNIQUEIDENTIFIER = NEWID();
    DECLARE @presentation_id UNIQUEIDENTIFIER;
    DECLARE @question_id UNIQUEIDENTIFIER;
    DECLARE @option_id UNIQUEIDENTIFIER;
    DECLARE @question_txt NVARCHAR(500);
    DECLARE @options NVARCHAR(MAX);
    DECLARE @option_txt NVARCHAR(200);
    DECLARE @is_correct BIT;

    -- Insert into Compliance table
    INSERT INTO Compliance (id, comp_name, comp_description, req_percentage, created_by, created_date)
    VALUES (@comp_id, @comp_name, @comp_description, @req_percentage, @created_by, GETDATE());

    -- Insert into Presentations table if file is provided
    IF @file_name IS NOT NULL AND @file_data IS NOT NULL
    BEGIN
        SET @presentation_id = NEWID();
        INSERT INTO Presentations (id, comp_id, file_name, file_data)
        VALUES (@presentation_id, @comp_id, @file_name, @file_data);
    END;

    -- Insert Questions and Options from JSON data
    DECLARE @jsonQuestions TABLE (question_txt NVARCHAR(500), options NVARCHAR(MAX));

    INSERT INTO @jsonQuestions (question_txt, options)
    SELECT 
        JSON_VALUE(q.value, '$.QuestionText'),
        JSON_QUERY(q.value, '$.Options')
    FROM OPENJSON(@questions) AS q;

    DECLARE question_cursor CURSOR FOR 
    SELECT question_txt, options FROM @jsonQuestions;

    OPEN question_cursor;

    FETCH NEXT FROM question_cursor INTO @question_txt, @options;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @question_id = NEWID();

        -- Insert into Questions table
        INSERT INTO Questions (id, comp_id, question_txt)
        VALUES (@question_id, @comp_id, @question_txt);

        -- ✅ Instead of using a table variable, we use a temporary table for **each question**
        CREATE TABLE #jsonOptions (option_txt NVARCHAR(200), is_correct BIT);
        
        INSERT INTO #jsonOptions (option_txt, is_correct)
        SELECT 
            JSON_VALUE(opt.value, '$.OptionText'),
            JSON_VALUE(opt.value, '$.IsCorrect')
        FROM OPENJSON(@options) AS opt;

        -- Declare and use the cursor for options
        DECLARE option_cursor CURSOR FOR 
        SELECT option_txt, is_correct FROM #jsonOptions;

        OPEN option_cursor;

        FETCH NEXT FROM option_cursor INTO @option_txt, @is_correct;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            SET @option_id = NEWID();

            -- Insert into Options table
            INSERT INTO Options (id, quest_id, option_txt, is_correct)
            VALUES (@option_id, @question_id, @option_txt, @is_correct);

            FETCH NEXT FROM option_cursor INTO @option_txt, @is_correct;
        END;

        CLOSE option_cursor;
        DEALLOCATE option_cursor;

        -- ✅ Drop temporary table after inserting options for the current question
        DROP TABLE #jsonOptions;

        FETCH NEXT FROM question_cursor INTO @question_txt, @options;
    END;

    CLOSE question_cursor;
    DEALLOCATE question_cursor;

    PRINT 'Compliance added successfully!';
END;
