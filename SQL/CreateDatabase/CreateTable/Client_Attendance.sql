USE [WheelChair]
GO

/****** Object:  Table [dbo].[Client_Attendance]    Script Date: 17/8/20 9:08:46 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Client_Attendance](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Attendance] [bit] NOT NULL,
	[Session] [nvarchar](50) NOT NULL,
	[Remarks] [nvarchar](255) NULL,
	[Picture] [nvarchar](max) NULL,
	[Video] [nvarchar](max) NULL,
	[XRay] [nvarchar](max) NULL,
	[Pressure] [nvarchar](max) NULL,
	[Progress] [nvarchar](max) NULL,
	[MO_Notes] [nvarchar](max) NULL,
	[Seating_Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Client_Attendance] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


