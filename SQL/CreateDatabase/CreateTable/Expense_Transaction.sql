USE [WheelChair]
GO

/****** Object:  Table [dbo].[Expense_Transaction]    Script Date: 17/8/20 3:22:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Expense_Transaction](
	[TransactionNo] [int] IDENTITY(1,1) NOT NULL,
	[Item] [nvarchar](255) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[UnitPrice] [money] NOT NULL,
	[Quantity] [smallint] NOT NULL,
	[Discount] [smallint] NOT NULL,
	[Company] [nvarchar](255) NULL,
	[QuotationNo] [nvarchar](50) NULL,
	[QuotationDate] [datetime] NULL,
	[CUHKPONo] [float] NULL,
	[PODate] [datetime] NULL,
	[AcquisitionDate] [datetime] NULL,
	[InvoiceNo] [nvarchar](50) NULL,
	[AssetNo] [int] NULL,
	[Settled] [bit] NOT NULL,
 CONSTRAINT [PK_Expense_Transaction] PRIMARY KEY CLUSTERED 
(
	[TransactionNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


