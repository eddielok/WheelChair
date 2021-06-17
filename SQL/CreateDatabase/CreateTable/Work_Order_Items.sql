USE [WheelChair]
GO

/****** Object:  Table [dbo].[Work_Order_Items]    Script Date: 17/8/20 3:27:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Work_Order_Items](
	[ref_ID] [int] IDENTITY(79,1) NOT NULL,
	[Order_No] [int] NOT NULL,
	[Order_Date] [datetime] NOT NULL,
	[Item] [nvarchar](255) NOT NULL,
	[Completed] [bit] NOT NULL,
	[Staff] [nvarchar](50) NOT NULL,
	[Completion_Date] [datetime] NULL,
 CONSTRAINT [PK_Work_Order_Items] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


