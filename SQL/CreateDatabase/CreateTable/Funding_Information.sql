USE [WheelChair]
GO

/****** Object:  Table [dbo].[Funding_Information]    Script Date: 17/8/20 3:23:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Funding_Information](
	[ref_ID] [int] IDENTITY(1,1) NOT NULL,
	[Donor] [nvarchar](255) NOT NULL,
	[DateDonation] [datetime] NOT NULL,
	[FundingActivity] [nvarchar](255) NULL,
	[Amount] [money] NOT NULL,
	[CollectingProjectTitle] [nvarchar](255) NULL,
	[CollectingProjectCode] [int] NULL,
	[ProposedUseFunding] [nvarchar](255) NULL,
 CONSTRAINT [PK_Funding_Information] PRIMARY KEY CLUSTERED 
(
	[ref_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


