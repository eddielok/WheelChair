USE [WheelChair]
GO

/****** Object:  Table [dbo].[Work_Order]    Script Date: 17/8/20 3:27:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Work_Order](
	[Order_No] [int] IDENTITY(1,1) NOT NULL,
	[Order_Date] [datetime] NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Work_Order] PRIMARY KEY CLUSTERED 
(
	[Order_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


