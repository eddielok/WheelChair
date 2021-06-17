USE [WheelChair]
GO

/****** Object:  Table [dbo].[PPMI]    Script Date: 17/8/20 3:24:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PPMI](
	[PPMI_RegNo] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Seat_No] [nvarchar](15) NULL,
	[Reason] [nvarchar](max) NULL,
	[Funding] [nvarchar](255) NULL,
	[Status] [nvarchar](50) NULL,
	[Quotation] [nvarchar](max) NULL,
	[res_Staff] [nvarchar](50) NOT NULL,
	[counter_Sign] [nvarchar](50) NULL,
 CONSTRAINT [PK_PPMI] PRIMARY KEY CLUSTERED 
(
	[PPMI_RegNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


