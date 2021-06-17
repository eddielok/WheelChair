USE [WheelChair]
GO

/****** Object:  Table [dbo].[Body_Dimension]    Script Date: 17/8/20 9:02:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Body_Dimension](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Height] [real] NULL,
	[Weight] [real] NULL,
	[PelvicWidth] [real] NULL,
	[PelvicWBrace] [real] NULL,
	[ChestWidth] [real] NULL,
	[ChestWBrace] [real] NULL,
	[ShoulderWidth] [real] NULL,
	[HeadWidth] [real] NULL,
	[KneeWidth] [real] NULL,
	[LSeatDepth] [real] NULL,
	[RSeatDepth] [real] NULL,
	[SeatToOcciput] [real] NULL,
	[SeatToOBrace] [real] NULL,
	[SeatToShoulder] [real] NULL,
	[SeatToSBrace] [real] NULL,
	[SeatToAxilla] [real] NULL,
	[SeatToPSIS] [real] NULL,
	[BackToAntOfIT] [real] NULL,
	[LLegLength] [real] NULL,
	[RLegLength] [real] NULL,
	[LFootLength] [real] NULL,
	[RFootLength] [real] NULL,
 CONSTRAINT [PK_Body_Dimension] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


