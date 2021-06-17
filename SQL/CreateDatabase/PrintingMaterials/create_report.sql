USE [WheelChair]
GO

/****** Object:  Table [dbo].[Report]    Script Date: 10/3/2020 5:23:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Report](
	[report] [varchar](10) NOT NULL,
	[field] [varchar](50) NULL,
	[value] [nvarchar](max) NULL,
	[language] char(3) NOT NULL,
	[active_date] [date] NOT NULL,
	[expires_date] [date] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Report] ADD  DEFAULT (getdate()) FOR [active_date]
GO

ALTER TABLE [dbo].[Report] ADD  DEFAULT (dateadd(year,(100),getdate())) FOR [expires_date]
GO


