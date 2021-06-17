USE [WheelChair]
GO

/****** Object:  Table [dbo].[School_List]    Script Date: 17/8/20 3:25:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[School_List](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[SchoolName] [nvarchar](255) NULL,
	[Region] [nvarchar](255) NULL,
	[Address] [nvarchar](255) NULL,
	[Telephone] [int] NULL,
	[Fax] [int] NULL,
 CONSTRAINT [PK_School_List] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


