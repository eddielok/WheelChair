USE [WheelChair]
GO

/****** Object:  Table [dbo].[Loan_Information]    Script Date: 17/8/20 3:23:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Loan_Information](
	[LoanFormNo] [nvarchar](6) NOT NULL,
	[Seat_No] [nvarchar](13) NULL,
	[PatientName] [nvarchar](255) NOT NULL,
	[BorrowerName] [nvarchar](255) NULL,
	[IDNo] [nvarchar](11) NULL,
	[TelHome] [int] NULL,
	[TelMobile] [int] NULL,
	[TelOffice] [int] NULL,
	[Address] [nvarchar](255) NULL,
	[LoanDate] [datetime] NOT NULL,
	[ReturnDate] [datetime] NULL,
	[WheelchairNo] [nvarchar](6) NULL,
	[Remarks] [nvarchar](max) NULL,
	[Witness] [nvarchar](100) NULL,
	[Rank] [nvarchar](20) NULL,
 CONSTRAINT [PK_Loan_Information] PRIMARY KEY CLUSTERED 
(
	[LoanFormNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


