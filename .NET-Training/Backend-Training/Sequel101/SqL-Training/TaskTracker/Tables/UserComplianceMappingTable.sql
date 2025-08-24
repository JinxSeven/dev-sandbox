CREATE TABLE UserCompliances (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    comp_id UNIQUEIDENTIFIER NOT NULL,
    assigned_date DATETIME DEFAULT GETDATE(),
    is_complete BIT NOT NULL DEFAULT 0,
    score DECIMAL(5, 2) NULL,
    CompletedDate DATETIME NULL,
    CONSTRAINT FK_UserCompliances_Users FOREIGN KEY (user_id) REFERENCES Users(id),
    CONSTRAINT FK_UserCompliances_Compliances FOREIGN KEY (comp_id) REFERENCES Compliances(id)
);