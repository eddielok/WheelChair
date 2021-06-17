USE [WheelChair]
GO

/****** Object:  Table [dbo].[Functional_Skills]    Script Date: 17/8/20 3:22:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Functional_Skills](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Dressing] [nvarchar](50) NULL,
	[Feeding] [nvarchar](50) NULL,
	[FeedingPosition] [nvarchar](255) NULL,
	[FeedingTime] [real] NULL,
	[AspirationFrequency] [nvarchar](50) NULL,
	[VomittingFrequency] [nvarchar](50) NULL,
	[Toiletting] [nvarchar](50) NULL,
	[Bathing] [nvarchar](50) NULL,
	[Splints] [bit] NOT NULL,
	[BathCommodeChair] [bit] NOT NULL,
	[CommunicationAids] [bit] NOT NULL,
	[Switches] [bit] NOT NULL,
	[ComputerAids] [bit] NOT NULL,
	[EnvironmentalControls] [bit] NOT NULL,
	[OtherATDs] [nvarchar](255) NULL,
	[MobilitySkills] [nvarchar](50) NULL,
	[Stand] [nvarchar](50) NULL,
	[StandDuration] [real] NULL,
	[StandFrequency] [real] NULL,
	[Transfer] [nvarchar](50) NULL,
	[WalkingADs] [nvarchar](50) NULL,
	[WalkingFrame] [nvarchar](50) NULL,
	[CurrentSeatHome] [nvarchar](50) NULL,
	[CurrentSeatTransport] [nvarchar](50) NULL,
	[TotalTimeUsed] [int] NULL,
	[UseFrequency] [nvarchar](50) NULL,
	[WeightShift] [nvarchar](50) NULL,
	[SelfPropel] [nvarchar](50) NULL,
	[Surfaces] [nvarchar](50) NULL,
	[WCTransport] [nvarchar](50) NULL,
	[WCTransportBy] [nvarchar](50) NULL,
	[AccessibilityProblems] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Functional_Skills] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


