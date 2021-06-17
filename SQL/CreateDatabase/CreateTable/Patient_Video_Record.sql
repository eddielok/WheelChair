USE [WheelChair]
GO

/****** Object:  Table [dbo].[Patient_Video_Record]    Script Date: 17/8/20 3:24:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Patient_Video_Record](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[TapeNo] [nvarchar](50) NOT NULL,
	[Index] [int] NOT NULL,
	[TimeCode] [nvarchar](50) NULL,
	[Duration] [nvarchar](50) NULL,
	[Date] [datetime] NOT NULL,
	[Description] [nvarchar](255) NULL,
 CONSTRAINT [PK_Patient_Video_Record] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


