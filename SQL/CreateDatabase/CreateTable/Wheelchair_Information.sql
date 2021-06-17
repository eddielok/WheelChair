USE [WheelChair]
GO

/****** Object:  Table [dbo].[Wheelchair_Information]    Script Date: 17/8/20 3:26:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Wheelchair_Information](
	[WheelchairNo] [nvarchar](6) NOT NULL,
	[WheelchairModel] [nvarchar](255) NOT NULL,
	[Availability] [bit] NOT NULL,
	[Status] [nvarchar](50) NULL,
	[Supplier] [nvarchar](50) NULL,
	[Color] [nvarchar](12) NULL,
	[PandaSize] [real] NULL,
	[SeatWidth] [float] NULL,
	[SeatDepth] [float] NULL,
	[Recliner] [bit] NOT NULL,
	[ElevatingFR] [bit] NOT NULL,
	[RearWheelSize] [nvarchar](3) NULL,
	[Price] [money] NULL,
	[AcqusitionDate] [datetime] NULL,
	[Inventory] [int] NULL,
	[FundedBy] [nvarchar](255) NULL,
	[LabelPrinted] [bit] NOT NULL,
	[condemnDate] [datetime] NULL
) ON [PRIMARY]
GO


