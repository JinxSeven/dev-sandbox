-- Create the Clients table
CREATE TABLE Clients (
    id UNIQUEIDENTIFIER PRIMARY KEY, -- Unique identifier for each client
    client_name NVARCHAR(100) NOT NULL,     -- Name of the client
    contact_mail NVARCHAR(255),            -- Contact email of the client
    contact_phone NVARCHAR(15),             -- Contact phone number of the client
    created_date DATETIME DEFAULT GETDATE() -- Date when the client was added
);

-- Create the Projects table
CREATE TABLE Projects (
    id UNIQUEIDENTIFIER PRIMARY KEY, -- Unique identifier for each project
    project_name NVARCHAR(100) NOT NULL,      -- Name of the project
    description NVARCHAR(MAX),               -- Description of the project
    start_date DATETIME,                      -- Start date of the project
    end_date DATETIME,                        -- End date of the project
    client_id UNIQUEIDENTIFIER NOT NULL,                   -- Foreign key to associate the project with a client
    CONSTRAINT FK_Projects_Clients FOREIGN KEY (client_id) 
        REFERENCES Clients(id)          -- Establish relationship with Clients table
        ON DELETE CASCADE                    -- Automatically delete projects if the associated client is deleted
        ON UPDATE CASCADE                    -- Automatically update ClientId in Projects if ClientId is updated in Clients
);