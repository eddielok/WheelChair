USE [WheelChair]
GO

/****** Object:  Table [dbo].[Client_Information]    Script Date: 17/8/20 9:20:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Client_Information](
	[Seat_No] [nvarchar](13) NOT NULL,
	[HKID] [nvarchar](11) NOT NULL,
	[Last_Name] [nvarchar](255) NOT NULL,
	[First_Name] [nvarchar](255) NOT NULL,
	[Chinese_Name] [nvarchar](50) NULL,
	[Sex] [nvarchar](1) NULL,
	[Age_1st_Att] [smallint] NULL,
	[DOB] [datetime] NOT NULL,
	[Tel_Home] [int] NULL,
	[Tel_Day] [int] NULL,
	[Address] [nvarchar](155) NULL,
	[District] [nvarchar](50) NULL,
	[Region] [nvarchar](50) NULL,
	[1st_Date] [datetime] NULL,
	[Diagnosis] [nvarchar](255) NULL,
	[Complications] [nvarchar](max) NULL,
	[Medical_Hx] [nvarchar](max) NULL,
	[Reason] [nvarchar](max) NULL,
	[Alive] [bit] NOT NULL,
 CONSTRAINT [PK_Client_Information] PRIMARY KEY CLUSTERED 
(
	[Seat_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


