USE [WheelChair]
GO

/****** Object:  Table [dbo].[Medical_Information]    Script Date: 17/8/20 3:23:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Medical_Information](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[SurgeryInfo] [nvarchar](255) NULL,
	[PendingSurgery] [nvarchar](255) NULL,
	[Seizures] [nvarchar](255) NULL,
	[PressureSores] [nvarchar](255) NULL,
	[ExistingSores] [nvarchar](255) NULL,
	[PainDiscomfort] [nvarchar](255) NULL,
	[Sensation] [nvarchar](255) NULL,
	[Hearing] [nvarchar](255) NULL,
	[Vision] [nvarchar](255) NULL,
	[RespiratoryStatus] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Medical_Information] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


