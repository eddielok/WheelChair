USE [WheelChair]
GO

/****** Object:  Table [dbo].[wcBankManagement_District_Cluster]    Script Date: 17/8/20 3:26:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[wcBankManagement_District_Cluster](
	[refID] [int] IDENTITY(1,1) NOT NULL,
	[District] [nvarchar](50) NULL,
	[Cluster] [nvarchar](50) NULL,
 CONSTRAINT [PK_wcBankManagement_District_Cluster] PRIMARY KEY CLUSTERED 
(
	[refID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


