USE [WheelChair]
GO

/****** Object:  Table [dbo].[QUEST_WCB]    Script Date: 17/8/20 3:25:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[QUEST_WCB](
	[refID] [int] IDENTITY(1,1) NOT NULL,
	[Device_Name] [nvarchar](255) NULL,
	[Duration_Use_Month] [int] NULL,
	[User] [nvarchar](255) NULL,
	[Clinic_No] [nvarchar](50) NULL,
	[Date] [datetime] NULL,
	[Verson] [nvarchar](50) NULL,
	[Device_Q1] [int] NULL,
	[Device_Q2] [int] NULL,
	[Device_Q3] [int] NULL,
	[Device_Q4] [int] NULL,
	[Device_Q5] [int] NULL,
	[Device_Q6] [int] NULL,
	[Device_Q7] [int] NULL,
	[Device_Q8] [int] NULL,
	[Service_Q1] [int] NULL,
	[Service_Q2] [int] NULL,
	[Service_Q3] [int] NULL,
	[Service_Q4] [int] NULL,
	[Important_1] [int] NULL,
	[Important_2] [int] NULL,
	[Important_3] [int] NULL,
	[Remarks] [nvarchar](max) NULL,
 CONSTRAINT [PK_QUEST_WCB] PRIMARY KEY CLUSTERED 
(
	[refID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


