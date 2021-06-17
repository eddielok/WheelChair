USE [WheelChair]
GO

/****** Object:  Table [dbo].[Wheelchair_Specification]    Script Date: 17/8/20 3:27:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Wheelchair_Specification](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[WheelchairModel] [nvarchar](255) NOT NULL,
	[WheelchairManufacturer] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Power] [bit] NOT NULL,
	[TiltInSpace] [bit] NOT NULL,
	[Foldable] [bit] NOT NULL,
	[wcPicLink] [nvarchar](max) NULL,
	[catalogLink] [nvarchar](max) NULL,
	[curPrice] [money] NULL,
 CONSTRAINT [PK_Wheelchair_Specification] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


