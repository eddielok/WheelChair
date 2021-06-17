USE [WheelChair]
GO

/****** Object:  Table [dbo].[Supplier]    Script Date: 17/8/20 8:36:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Supplier](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Supplier] [nvarchar](255) NOT NULL,
	[Last] [nvarchar](255) NULL,
	[TelWork] [int] NULL,
	[TelOffice] [int] NULL,
	[Fax] [int] NULL,
	[EMail] [nvarchar](50) NULL,
	[Address] [nvarchar](255) NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


