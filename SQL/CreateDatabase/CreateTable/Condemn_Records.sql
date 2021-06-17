USE [WheelChair]
GO

/****** Object:  Table [dbo].[Condemn_Records]    Script Date: 17/8/20 3:22:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Condemn_Records](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[ItemNo] [nvarchar](50) NOT NULL,
	[ItemDescription] [nvarchar](255) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[acqDate] [datetime] NULL,
	[condemnDate] [datetime] NOT NULL,
	[condemnReason] [nvarchar](255) NULL,
	[remarks] [nvarchar](255) NULL,
 CONSTRAINT [PK_Condemn_Records] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


