USE [WheelChair]
GO

/****** Object:  Table [dbo].[Wheelchair_Accident_Report]    Script Date: 17/8/20 3:26:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Wheelchair_Accident_Report](
	[Report_No] [int] NOT NULL,
	[Reported Date] [datetime] NULL,
	[Seat_No] [nvarchar](50) NULL,
	[Wheelchair No] [nvarchar](50) NULL,
	[Accident_Date] [datetime] NULL,
	[Details] [nvarchar](max) NULL,
	[Injury] [bit] NOT NULL,
	[Injury_Description] [nvarchar](255) NULL,
	[Action] [nvarchar](255) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


