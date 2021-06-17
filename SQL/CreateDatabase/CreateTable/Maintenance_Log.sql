USE [WheelChair]
GO

/****** Object:  Table [dbo].[Maintenance_Log]    Script Date: 17/8/20 3:23:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Maintenance_Log](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Item_No] [nvarchar](255) NULL,
	[Seat_No] [nvarchar](50) NULL,
	[Date] [datetime] NULL,
	[Problems] [nvarchar](255) NULL,
	[MaintenanceProcedures] [nvarchar](255) NULL,
	[CompletionDate] [datetime] NULL,
	[Staff] [nvarchar](255) NULL,
 CONSTRAINT [PK_Maintenance_Log] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


