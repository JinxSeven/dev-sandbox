CREATE TABLE Compliance (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    comp_name NVARCHAR(200) NOT NULL,
    comp_description NVARCHAR(500),
	req_percentage DECIMAL(4,2),
	created_by NVARCHAR(100),
	created_date DATETIME
);

CREATE TABLE Presentations (
	id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	comp_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Compliance(id),
	file_name NVARCHAR(255),
    file_data VARBINARY(MAX)
);

-- Create Questions table
CREATE TABLE Questions (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    comp_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Compliance(id),
    question_txt NVARCHAR(500) NOT NULL
);

-- Create Options table
CREATE TABLE Options (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    quest_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Questions(id),
    option_txt NVARCHAR(200) NOT NULL,
    is_correct BIT NOT NULL,
    CONSTRAINT CK_Options_CorrectAnswer CHECK (is_correct IN (0, 1))
);