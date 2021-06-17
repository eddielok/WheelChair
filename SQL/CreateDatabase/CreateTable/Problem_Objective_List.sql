USE [WheelChair]
GO

/****** Object:  Table [dbo].[Problem_Objective_List]    Script Date: 17/8/20 3:24:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Problem_Objective_List](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Deformity1] [bit] NOT NULL,
	[Deformity2] [bit] NOT NULL,
	[Deformity3] [bit] NOT NULL,
	[Deformity4] [nvarchar](255) NULL,
	[Deformity5] [nvarchar](255) NULL,
	[PressureArea1] [bit] NOT NULL,
	[PressureArea2] [bit] NOT NULL,
	[PressureArea3] [nvarchar](255) NULL,
	[PressureArea4] [nvarchar](255) NULL,
	[SitPosture1] [bit] NOT NULL,
	[SitPosture2] [bit] NOT NULL,
	[SitPosture3] [nvarchar](255) NULL,
	[SitPosture4] [nvarchar](255) NULL,
	[SitTolerance1] [bit] NOT NULL,
	[SitTolerance2] [bit] NOT NULL,
	[SitTolerance3] [bit] NOT NULL,
	[SitTolerance4] [nvarchar](255) NULL,
	[SitTolerance5] [nvarchar](255) NULL,
	[Ambulation1] [bit] NOT NULL,
	[Ambulation2] [bit] NOT NULL,
	[Ambulation3] [bit] NOT NULL,
	[Ambulation4] [bit] NOT NULL,
	[Ambulation5] [nvarchar](255) NULL,
	[Ambulation6] [nvarchar](255) NULL,
	[ULFunction1] [bit] NOT NULL,
	[ULFunction2] [bit] NOT NULL,
	[ULFunction3] [bit] NOT NULL,
	[ULFunction4] [nvarchar](255) NULL,
	[ULFunction5] [nvarchar](255) NULL,
	[FunctionalSkills1] [bit] NOT NULL,
	[FunctionalSkills2] [bit] NOT NULL,
	[FunctionalSkills3] [bit] NOT NULL,
	[FunctionalSkills4] [bit] NOT NULL,
	[FunctionalSkills5] [nvarchar](255) NULL,
	[FunctionalSkills6] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Problem_Objective_List] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


