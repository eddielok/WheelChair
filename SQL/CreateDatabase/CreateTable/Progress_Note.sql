USE [WheelChair]
GO

/****** Object:  Table [dbo].[Progress_Note]    Script Date: 17/8/20 3:24:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Progress_Note](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NULL,
	[Note] [nvarchar](max) NOT NULL,
	[Therapist] [nvarchar](255) NOT NULL,
	[Hardcopy] [nvarchar](max) NULL,
 CONSTRAINT [PK_Progress_Note] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


