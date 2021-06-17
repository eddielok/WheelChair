USE [WheelChair]
GO

/****** Object:  Table [dbo].[Wheelchair_Dimension]    Script Date: 17/8/20 3:26:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Wheelchair_Dimension](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NULL,
	[PandaSize] [real] NULL,
	[BackHeight] [real] NULL,
	[WCSeatWidth] [real] NULL,
	[WCLSeatDepth] [real] NULL,
	[WCRSeatDepth] [real] NULL,
	[WCSeatHeight] [real] NULL,
	[SeatToBackAngle] [real] NULL,
	[SystemTiltAngle] [real] NULL,
	[LLateralSupportHeight] [int] NULL,
	[RLateralSupportHeight] [real] NULL,
	[LArmrestHeight] [real] NULL,
	[RArmrestHeight] [real] NULL,
	[LSeatToLegrestAngle] [real] NULL,
	[RSeatToLegrestAngle] [real] NULL,
	[LLegrestFootrestAngle] [real] NULL,
	[RLegrestFootrestAngle] [real] NULL,
	[LLegrestLength] [real] NULL,
	[RLegrestLength] [real] NULL,
	[DropRaiseSeatHeight] [real] NULL,
 CONSTRAINT [PK_Wheelchair_Dimension] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


