USE [WheelChair]
GO

/****** Object:  Table [dbo].[Loaned_Article]    Script Date: 17/8/20 4:00:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Loaned_Article](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[LoanFormNo] [nvarchar](6) NOT NULL,
	[PartNo] [nvarchar](50) NOT NULL,
	[Remarks] [nvarchar](max) NULL,
	[Broken] [bit] NOT NULL,
	[DateBroken] [datetime] NULL,
	[Paid] [bit] NOT NULL,
 CONSTRAINT [PK_Loaned_Article] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


