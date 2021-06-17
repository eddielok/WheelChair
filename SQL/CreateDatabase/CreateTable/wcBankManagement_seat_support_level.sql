USE [WheelChair]
GO

/****** Object:  Table [dbo].[wcBankManagement_seat_support_level]    Script Date: 17/8/20 3:26:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[wcBankManagement_seat_support_level](
	[refID] [int] IDENTITY(1,1) NOT NULL,
	[support_level] [nvarchar](255) NOT NULL,
	[code] [int] NOT NULL,
 CONSTRAINT [PK_wcBankManagement_seat_support_level] PRIMARY KEY CLUSTERED 
(
	[refID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


