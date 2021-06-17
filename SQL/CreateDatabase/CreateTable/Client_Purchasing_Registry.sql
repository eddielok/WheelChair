USE [WheelChair]
GO

/****** Object:  Table [dbo].[Client_Purchasing_Registry]    Script Date: 17/8/20 3:21:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Client_Purchasing_Registry](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Invoice_No] [int] NOT NULL,
	[Date] [datetime] NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Amount] [money] NOT NULL,
	[Purchased_Item] [nvarchar](255) NOT NULL,
	[Payment_Type] [nvarchar](50) NOT NULL,
	[Cheque_No] [int] NULL,
	[Bank_Cheque] [nvarchar](100) NULL,
	[Staff] [nvarchar](50) NULL,
 CONSTRAINT [PK_Client_Purchasing_Registry] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


