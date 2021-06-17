USE [WheelChair]
GO

/****** Object:  Table [dbo].[Seating_System_Prescription]    Script Date: 17/8/20 3:25:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Seating_System_Prescription](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[ChairType] [nvarchar](10) NULL,
	[FrameType] [nvarchar](50) NULL,
	[SeatBase] [nvarchar](50) NULL,
	[CushionType] [nvarchar](50) NULL,
	[CushionDensity] [nvarchar](50) NULL,
	[CushionModification] [nvarchar](50) NULL,
	[CushionCover] [nvarchar](50) NULL,
	[PelvicStablizer] [nvarchar](50) NULL,
	[PelvicSupport] [nvarchar](50) NULL,
	[AdductorWedge] [nvarchar](50) NULL,
	[AbductorWedge] [nvarchar](50) NULL,
	[KneeSupport] [nvarchar](50) NULL,
	[BackrestType] [nvarchar](50) NULL,
	[BackCushionType] [nvarchar](50) NULL,
	[BackCushionDensity] [nvarchar](50) NULL,
	[BackModification] [nvarchar](50) NULL,
	[SeatToBack] [nvarchar](50) NULL,
	[LateralSupport] [nvarchar](50) NULL,
	[SpinalBrace] [nvarchar](50) NULL,
	[LumbarSupport] [nvarchar](50) NULL,
	[ShoulderSupport] [nvarchar](50) NULL,
	[HeadSupport] [nvarchar](50) NULL,
	[SpecialItem1] [nvarchar](50) NULL,
	[SpecialItem2] [nvarchar](50) NULL,
	[SpecialItem3] [nvarchar](50) NULL,
	[SpecialItem4] [nvarchar](50) NULL,
	[SpecialItem5] [nvarchar](50) NULL,
	[SpecialItem6] [nvarchar](50) NULL,
	[SpecialItem7] [nvarchar](50) NULL,
	[Notes] [nvarchar](max) NULL,
	[FullSystemChanges] [nvarchar](50) NULL,
	[PtPruchaseWC] [nvarchar](50) NULL,
	[PtHaveWC] [nvarchar](50) NULL,
 CONSTRAINT [PK_Seating_System_Prescription] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


