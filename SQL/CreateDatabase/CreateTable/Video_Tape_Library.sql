USE [WheelChair]
GO

/****** Object:  Table [dbo].[Video_Tape_Library]    Script Date: 17/8/20 3:26:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Video_Tape_Library](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[TapeNo] [nvarchar](50) NOT NULL,
	[Index] [int] NOT NULL,
	[TimeCode] [nvarchar](50) NULL,
	[DateRecording] [datetime] NOT NULL,
	[Description] [nvarchar](255) NULL,
 CONSTRAINT [PK_Video_Tape_Library] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


