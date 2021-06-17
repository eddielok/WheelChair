USE [WheelChair]
GO

/****** Object:  Table [dbo].[PPMI_Items]    Script Date: 17/8/20 3:24:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PPMI_Items](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[PPMI_RegNo] [int] NULL,
	[Item] [nvarchar](155) NULL,
	[Specification] [nvarchar](100) NULL,
	[Supplier] [nvarchar](255) NULL,
	[Quotation_No] [nvarchar](50) NULL,
	[Quantity] [int] NULL,
	[Amount] [money] NULL,
	[Patient_Selected] [bit] NOT NULL,
 CONSTRAINT [PK_PPMI_Items] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


