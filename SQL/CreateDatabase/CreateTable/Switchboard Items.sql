USE [WheelChair]
GO

/****** Object:  Table [dbo].[Switchboard Items]    Script Date: 17/8/20 3:25:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Switchboard Items](
	[SwitchboardID] [int] NULL,
	[ItemNumber] [smallint] NULL,
	[ItemText] [nvarchar](255) NULL,
	[Command] [smallint] NULL,
	[Argument] [nvarchar](255) NULL
) ON [PRIMARY]
GO


