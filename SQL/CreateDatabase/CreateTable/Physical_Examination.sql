USE [WheelChair]
GO

/****** Object:  Table [dbo].[Physical_Examination]    Script Date: 17/8/20 3:24:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Physical_Examination](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NOT NULL,
	[Date] [datetime] NOT NULL,
	[SkinCondition] [nvarchar](50) NULL,
	[PressureMap] [bit] NOT NULL,
	[MatHeadPosition] [nvarchar](50) NULL,
	[MatHeadRot] [nvarchar](50) NULL,
	[MatPelvicAntTilt] [nvarchar](50) NULL,
	[MatPelvicAntTiltRange] [nvarchar](50) NULL,
	[MatPelvicPostTilt] [nvarchar](50) NULL,
	[MatPelvicPostTiltRange] [nvarchar](50) NULL,
	[MatPelvicSideFlexL] [nvarchar](50) NULL,
	[MatPelvicSideFlexRangeL] [nvarchar](50) NULL,
	[MatPelvicSideFlexR] [nvarchar](50) NULL,
	[MatPelvicSideFlexRangeR] [nvarchar](50) NULL,
	[MatPelvicRotL] [nvarchar](50) NULL,
	[MatPelvicRotRangeL] [nvarchar](50) NULL,
	[MatPelvicRotR] [nvarchar](50) NULL,
	[MatPelvicRotRangeR] [nvarchar](50) NULL,
	[MatHipFlex] [nvarchar](50) NULL,
	[MatHipContracture] [nvarchar](50) NULL,
	[MatHipAbdAdd] [nvarchar](50) NULL,
	[MatHipRotate] [nvarchar](50) NULL,
	[MatHipIntegrity] [nvarchar](50) NULL,
	[MatKneePopliteal] [nvarchar](50) NULL,
	[MatKneeContracture] [nvarchar](50) NULL,
	[MatAnkle] [nvarchar](50) NULL,
	[MatSpine] [nvarchar](50) NULL,
	[MatSpinePri] [nvarchar](50) NULL,
	[MatSpineSec] [nvarchar](50) NULL,
	[SittingBalance] [nvarchar](100) NULL,
	[SitHeadControl] [nvarchar](50) NULL,
	[SitHeadFlex] [nvarchar](50) NULL,
	[SitHeadPreferToTurn] [nvarchar](50) NULL,
	[SitHeadDrop] [nvarchar](50) NULL,
	[SitSpine] [nvarchar](50) NULL,
	[SitHeadTilt] [nvarchar](50) NULL,
	[SitHeadTiltSeverity] [nvarchar](50) NULL,
	[SitHeadTiltFlexibility] [nvarchar](50) NULL,
	[SitThoracicConvexity] [nvarchar](50) NULL,
	[SitThoracicSeverity] [nvarchar](50) NULL,
	[SitThoracicFlexibility] [nvarchar](50) NULL,
	[SitLumbarConvexity] [nvarchar](50) NULL,
	[SitLumbarSeverity] [nvarchar](50) NULL,
	[SitLumbarFlexibility] [nvarchar](50) NULL,
	[SitRibHump] [nvarchar](50) NULL,
	[SitHumpLevel] [nvarchar](50) NULL,
	[SitKyphosis] [nvarchar](50) NULL,
	[SitKyphoticFlexibility] [nvarchar](50) NULL,
	[SitLordosis] [nvarchar](50) NULL,
	[SitLordoticFlexibility] [nvarchar](50) NULL,
	[SitSpineRotation] [nvarchar](50) NULL,
	[SitLumbarFlexion] [nvarchar](50) NULL,
	[SitLumbarExtension] [nvarchar](50) NULL,
	[SitPelvicFlexibility] [nvarchar](255) NULL,
	[SitPelvicFlexibilityTilt] [nvarchar](255) NULL,
	[SitPelvicTilt] [nvarchar](50) NULL,
	[SitPelvicObliquity] [nvarchar](50) NULL,
	[SitPelvicRotation] [nvarchar](50) NULL,
	[SitThighsWindswept] [nvarchar](50) NULL,
	[SitThighsAdducted] [nvarchar](50) NULL,
	[Tone] [nvarchar](50) NULL,
	[Reflexes] [nvarchar](100) NULL,
	[Movement] [nvarchar](100) NULL,
	[LLStrength] [nvarchar](100) NULL,
	[ULStrength] [nvarchar](100) NULL,
	[HandFunction] [nvarchar](100) NULL,
	[ULFunction] [nvarchar](100) NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_Physical_Examination] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


