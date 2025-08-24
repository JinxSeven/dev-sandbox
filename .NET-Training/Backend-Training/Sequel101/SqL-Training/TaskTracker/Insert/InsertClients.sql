USE [TaskTracker]
GO

INSERT INTO [dbo].[Clients]
           ([id]
           ,[client_name]
           ,[contact_mail]
           ,[contact_phone]
           ,[created_date])
     VALUES
           (NEWID(),
           'TechSolutions Ltd',
           'info@techsolutions.co.uk',
           '+44 20 7946 0958',
           GETDATE())
GO

INSERT INTO [dbo].[Clients]
           ([id]
           ,[client_name]
           ,[contact_mail]
           ,[contact_phone]
           ,[created_date])
     VALUES
           (NEWID(),
           'GreenGrocers Ltd',
           'sales@greengrocers.co.uk',
           '+44 20 7946 1234',
           GETDATE())
GO

INSERT INTO [dbo].[Clients]
           ([id]
           ,[client_name]
           ,[contact_mail]
           ,[contact_phone]
           ,[created_date])
     VALUES
           (NEWID(),
           'BrightDesigns Ltd',
           'contact@brightdesigns.co.uk',
           '+44 20 7946 5678',
           GETDATE())
GO
