USE [WheelChair]
GO

/****** Object:  Table [dbo].[Ortho_Spinal_Assessment]    Script Date: 17/8/20 3:23:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ortho_Spinal_Assessment](
	[refID] [int] IDENTITY(1,1) NOT NULL,
	[Seat_No] [nvarchar](50) NULL,
	[Date] [datetime] NULL,
	[Assessment] [nvarchar](255) NULL,
	[SLA_1] [nvarchar](50) NULL,
	[SLA_2] [nvarchar](50) NULL,
	[SLA_3] [nvarchar](50) NULL,
	[Risser] [nvarchar](50) NULL,
	[Menarche] [nvarchar](50) NULL,
	[Thoracic] [nvarchar](50) NULL,
	[Lumbar] [nvarchar](50) NULL,
	[SPA] [nvarchar](50) NULL,
	[R_PFA] [nvarchar](50) NULL,
	[L_PFA] [nvarchar](50) NULL,
 CONSTRAINT [PK_Ortho_Spinal_Assessment] PRIMARY KEY CLUSTERED 
(
	[refID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


