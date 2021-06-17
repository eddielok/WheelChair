USE [WheelChair]
GO

/****** Object:  Table [dbo].[Social_Information]    Script Date: 17/8/20 3:25:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Social_Information](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Accommodation] [nvarchar](255) NULL,
	[Area] [int] NULL,
	[DoorWidth] [int] NULL,
	[SmallRoomSpace] [bit] NOT NULL,
	[StepsOutside] [int] NULL,
	[KerbsOutside] [int] NULL,
	[RampsOutside] [bit] NOT NULL,
	[LiftLanding] [bit] NOT NULL,
	[Caretaker] [nvarchar](50) NULL,
	[SchoolName] [nvarchar](255) NULL,
	[Therapist] [nvarchar](50) NULL,
	[ContactNo] [real] NULL,
	[SchoolType] [nvarchar](50) NULL,
	[Residental] [bit] NOT NULL,
	[SchoolEquip1] [nvarchar](255) NULL,
	[SchoolEquip2] [nvarchar](255) NULL,
	[SchoolEquip3] [nvarchar](255) NULL,
	[OtherSchoolEquip] [nvarchar](255) NULL,
	[SchoolTableHeight] [int] NULL,
	[SchoolTableKneeClearance] [int] NULL,
	[LapTrayFor] [nvarchar](255) NULL,
	[Company] [nvarchar](255) NULL,
	[JobTask] [nvarchar](255) NULL,
	[CompanyTableHeight] [int] NULL,
	[CompanyTableKneeClearance] [int] NULL,
	[OtherAdaptiveEquipment] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Social_Information] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


