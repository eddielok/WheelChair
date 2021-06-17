USE [WheelChair]
GO

/****** Object:  Table [dbo].[Parts_Information]    Script Date: 17/8/20 3:24:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Parts_Information](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[PartNo] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[PartType] [nvarchar](100) NOT NULL,
	[Consumable] [bit] NOT NULL,
	[Manufacturer] [nvarchar](100) NULL,
	[Supplier] [nvarchar](100) NULL,
	[TotalQuantity] [int] NOT NULL,
	[OutQuantity] [int] NOT NULL,
	[picLink] [nvarchar](max) NULL,
	[Price] [money] NULL,
 CONSTRAINT [PK_Parts_Information] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


