using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WheelChair.Models
{
    public partial class WheelChairContext : DbContext
    {
        public WheelChairContext()
        {
        }

        public WheelChairContext(DbContextOptions<WheelChairContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BodyDimension> BodyDimension { get; set; }
        public virtual DbSet<ClientAttendance> ClientAttendance { get; set; }
        public virtual DbSet<ClientInformation> ClientInformation { get; set; }
        public virtual DbSet<ClientPurchasingRegistry> ClientPurchasingRegistry { get; set; }
        public virtual DbSet<CondemnRecords> CondemnRecords { get; set; }
        public virtual DbSet<ExpenseTransaction> ExpenseTransaction { get; set; }
        public virtual DbSet<FunctionalSkills> FunctionalSkills { get; set; }
        public virtual DbSet<FundingInformation> FundingInformation { get; set; }
        public virtual DbSet<LoanInformation> LoanInformation { get; set; }
        public virtual DbSet<LoanInformationOld> LoanInformationOld { get; set; }
        public virtual DbSet<LoanedArticle> LoanedArticle { get; set; }
        public virtual DbSet<MaintenanceLog> MaintenanceLog { get; set; }
        public virtual DbSet<MedicalInformation> MedicalInformation { get; set; }
        public virtual DbSet<OrthoSpinalAssessment> OrthoSpinalAssessment { get; set; }
        public virtual DbSet<PartsInformation> PartsInformation { get; set; }
        public virtual DbSet<PatientVideoRecord> PatientVideoRecord { get; set; }
        public virtual DbSet<PhysicalExamination> PhysicalExamination { get; set; }
        public virtual DbSet<Ppmi> Ppmi { get; set; }
        public virtual DbSet<PpmiItems> PpmiItems { get; set; }
        public virtual DbSet<ProblemObjectiveList> ProblemObjectiveList { get; set; }
        public virtual DbSet<ProgressNote> ProgressNote { get; set; }
        public virtual DbSet<QuestChTValidation> QuestChTValidation { get; set; }
        public virtual DbSet<QuestWcb> QuestWcb { get; set; }
        public virtual DbSet<SchoolList> SchoolList { get; set; }
        public virtual DbSet<SeatingSystemPrescription> SeatingSystemPrescription { get; set; }
        public virtual DbSet<SocialInformation> SocialInformation { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<SwitchboardItems> SwitchboardItems { get; set; }
        public virtual DbSet<VideoTapeLibrary> VideoTapeLibrary { get; set; }
        public virtual DbSet<WcBankManagementDistrictCluster> WcBankManagementDistrictCluster { get; set; }
        public virtual DbSet<WcBankManagementSeatSupportLevel> WcBankManagementSeatSupportLevel { get; set; }
        public virtual DbSet<WheelchairAccidentReport> WheelchairAccidentReport { get; set; }
        public virtual DbSet<WheelchairDimension> WheelchairDimension { get; set; }
        public virtual DbSet<WheelchairInformation> WheelchairInformation { get; set; }
        public virtual DbSet<WheelchairSpecification> WheelchairSpecification { get; set; }
        public virtual DbSet<WorkOrder> WorkOrder { get; set; }
        public virtual DbSet<WorkOrderItems> WorkOrderItems { get; set; }

        public virtual DbSet<Account> Account { get; set; }

        public virtual DbSet<UserLogin> UserLogin { get; set; }


        public object PpmiItemsRestful { get; internal set; }

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //                optionsBuilder.UseSqlServer("Server=LAPTOP-G08D86D1\\SQLEXPRESS;Database=WheelChair;Integrated Security=True");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BodyDimension>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Body_Dimension");

                entity.Property(e => e.BackToAntOfIt).HasColumnName("BackToAntOfIT");

                entity.Property(e => e.ChestWbrace).HasColumnName("ChestWBrace");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.LfootLength).HasColumnName("LFootLength");

                entity.Property(e => e.LlegLength).HasColumnName("LLegLength");

                entity.Property(e => e.LseatDepth).HasColumnName("LSeatDepth");

                entity.Property(e => e.PelvicWbrace).HasColumnName("PelvicWBrace");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.RfootLength).HasColumnName("RFootLength");

                entity.Property(e => e.RlegLength).HasColumnName("RLegLength");

                entity.Property(e => e.RseatDepth).HasColumnName("RSeatDepth");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SeatToObrace).HasColumnName("SeatToOBrace");

                entity.Property(e => e.SeatToPsis).HasColumnName("SeatToPSIS");

                entity.Property(e => e.SeatToSbrace).HasColumnName("SeatToSBrace");
            });

            modelBuilder.Entity<ClientAttendance>(entity =>
            {
       
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Client_Attendance");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.MoNotes).HasColumnName("MO_Notes");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Remarks).HasMaxLength(255);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SeatingNotes).HasColumnName("Seating_Notes");

                entity.Property(e => e.Session)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Xray).HasColumnName("XRay");
            });

            modelBuilder.Entity<ClientInformation>(entity =>
            {
                entity.HasKey(t => new { t.SeatNo });

                entity.ToTable("Client_Information");

                entity.Property(e => e.Address).HasMaxLength(155);

                entity.Property(e => e.Age1stAtt).HasColumnName("Age_1st_Att");

                entity.Property(e => e.ChineseName)
                    .HasColumnName("Chinese_Name")
                    .HasMaxLength(50);

                entity.Property(e => e.Diagnosis).HasMaxLength(255);

                entity.Property(e => e.District).HasMaxLength(50);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("First_Name")
                    .HasMaxLength(255);

                entity.Property(e => e.Hkid)
                    .IsRequired()
                    .HasColumnName("HKID")
                    .HasMaxLength(11);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("Last_Name")
                    .HasMaxLength(255);

                entity.Property(e => e.MedicalHx).HasColumnName("Medical_Hx");

                entity.Property(e => e.Region).HasMaxLength(50);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(13);

                entity.Property(e => e.Sex).HasMaxLength(1);

                entity.Property(e => e.TelDay).HasColumnName("Tel_Day");

                entity.Property(e => e.TelHome).HasColumnName("Tel_Home");

                entity.Property(e => e._1stDate)
                    .HasColumnName("1st_Date")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<ClientPurchasingRegistry>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Client_Purchasing_Registry");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.BankCheque)
                    .HasColumnName("Bank_Cheque")
                    .HasMaxLength(100);

                entity.Property(e => e.ChequeNo).HasColumnName("Cheque_No");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.InvoiceNo).HasColumnName("Invoice_No");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PaymentType)
                    .IsRequired()
                    .HasColumnName("Payment_Type")
                    .HasMaxLength(50);

                entity.Property(e => e.PurchasedItem)
                    .IsRequired()
                    .HasColumnName("Purchased_Item")
                    .HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Staff).HasMaxLength(50);
            });

            modelBuilder.Entity<CondemnRecords>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Condemn_Records");

                entity.Property(e => e.AcqDate)
                    .HasColumnName("acqDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.CondemnDate)
                    .HasColumnName("condemnDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.CondemnReason)
                    .HasColumnName("condemnReason")
                    .HasMaxLength(255);

                entity.Property(e => e.ItemDescription)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.ItemNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Remarks)
                    .HasColumnName("remarks")
                    .HasMaxLength(255);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ExpenseTransaction>(entity =>
            {
                entity.HasKey(t => new { t.TransactionNo });

                entity.ToTable("Expense_Transaction");

                entity.Property(e => e.AcquisitionDate).HasColumnType("datetime");

                entity.Property(e => e.Company).HasMaxLength(255);

                entity.Property(e => e.Cuhkpono).HasColumnName("CUHKPONo");

                entity.Property(e => e.InvoiceNo).HasMaxLength(50);

                entity.Property(e => e.Item)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Podate)
                    .HasColumnName("PODate")
                    .HasColumnType("datetime");

                entity.Property(e => e.QuotationDate).HasColumnType("datetime");

                entity.Property(e => e.QuotationNo).HasMaxLength(50);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UnitPrice).HasColumnType("money");
            });

            modelBuilder.Entity<FunctionalSkills>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Functional_Skills");

                entity.Property(e => e.AccessibilityProblems).HasMaxLength(255);

                entity.Property(e => e.AspirationFrequency).HasMaxLength(50);

                entity.Property(e => e.Bathing).HasMaxLength(50);

                entity.Property(e => e.CurrentSeatHome).HasMaxLength(50);

                entity.Property(e => e.CurrentSeatTransport).HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Dressing).HasMaxLength(50);

                entity.Property(e => e.Feeding).HasMaxLength(50);

                entity.Property(e => e.FeedingPosition).HasMaxLength(255);

                entity.Property(e => e.MobilitySkills).HasMaxLength(50);

                entity.Property(e => e.OtherAtds)
                    .HasColumnName("OtherATDs")
                    .HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SelfPropel).HasMaxLength(50);

                entity.Property(e => e.Stand).HasMaxLength(50);

                entity.Property(e => e.Surfaces).HasMaxLength(50);

                entity.Property(e => e.Toiletting).HasMaxLength(50);

                entity.Property(e => e.Transfer).HasMaxLength(50);

                entity.Property(e => e.UseFrequency).HasMaxLength(50);

                entity.Property(e => e.VomittingFrequency).HasMaxLength(50);

                entity.Property(e => e.WalkingAds)
                    .HasColumnName("WalkingADs")
                    .HasMaxLength(50);

                entity.Property(e => e.WalkingFrame).HasMaxLength(50);

                entity.Property(e => e.Wctransport)
                    .HasColumnName("WCTransport")
                    .HasMaxLength(50);

                entity.Property(e => e.WctransportBy)
                    .HasColumnName("WCTransportBy")
                    .HasMaxLength(50);

                entity.Property(e => e.WeightShift).HasMaxLength(50);
            });

            modelBuilder.Entity<FundingInformation>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Funding_Information");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.CollectingProjectTitle).HasMaxLength(255);

                entity.Property(e => e.DateDonation).HasColumnType("datetime");

                entity.Property(e => e.Donor)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.FundingActivity).HasMaxLength(255);

                entity.Property(e => e.ProposedUseFunding).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");
            });

            modelBuilder.Entity<LoanInformation>(entity =>
            {
                entity.HasKey(t => new { t.LoanFormNo });

                entity.ToTable("Loan_Information");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.BorrowerName).HasMaxLength(255);

                entity.Property(e => e.Idno)
                    .HasColumnName("IDNo")
                    .HasMaxLength(11);

                entity.Property(e => e.LoanDate).HasColumnType("datetime");

                entity.Property(e => e.LoanFormNo)
                    .IsRequired()
                    .HasMaxLength(6);

                entity.Property(e => e.PatientName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Rank).HasMaxLength(20);

                entity.Property(e => e.ReturnDate).HasColumnType("datetime");

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(13);

                entity.Property(e => e.WheelchairNo).HasMaxLength(6);

                entity.Property(e => e.Witness).HasMaxLength(100);
            });

            modelBuilder.Entity<LoanInformationOld>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Loan_Information_Old");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.BorrowerName).HasMaxLength(255);

                entity.Property(e => e.Idno)
                    .HasColumnName("IDNo")
                    .HasMaxLength(11);

                entity.Property(e => e.LoanDate).HasColumnType("datetime");

                entity.Property(e => e.LoanFormNo)
                    .IsRequired()
                    .HasMaxLength(6);

                entity.Property(e => e.LoanedArticle01).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle02).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle03).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle04).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle05).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle06).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle07).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle08).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle09).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle10).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle11).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle12).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle13).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle14).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle15).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle16).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle17).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle18).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle19).HasMaxLength(50);

                entity.Property(e => e.LoanedArticle20).HasMaxLength(50);

                entity.Property(e => e.PatientName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Rank).HasMaxLength(20);

                entity.Property(e => e.ReturnDate).HasColumnType("datetime");

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(13);

                entity.Property(e => e.WheelchairNo).HasMaxLength(6);

                entity.Property(e => e.Witness).HasMaxLength(100);
            });

            modelBuilder.Entity<LoanedArticle>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Loaned_Article");

                entity.Property(e => e.DateBroken).HasColumnType("datetime");

                entity.Property(e => e.LoanFormNo)
                    .IsRequired()
                    .HasMaxLength(6);

                entity.Property(e => e.PartNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");
            });

            modelBuilder.Entity<MaintenanceLog>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Maintenance_Log");

                entity.Property(e => e.CompletionDate).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ItemNo)
                    .HasColumnName("Item_No")
                    .HasMaxLength(255);

                entity.Property(e => e.MaintenanceProcedures).HasMaxLength(255);

                entity.Property(e => e.Problems).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Staff).HasMaxLength(255);
            });

            modelBuilder.Entity<MedicalInformation>(entity =>
            {

                entity.HasKey(t => new { t.RefId  });

                entity.ToTable("Medical_Information");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ExistingSores).HasMaxLength(255);

                entity.Property(e => e.Hearing).HasMaxLength(255);

                entity.Property(e => e.PainDiscomfort).HasMaxLength(255);

                entity.Property(e => e.PendingSurgery).HasMaxLength(255);

                entity.Property(e => e.PressureSores).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.RespiratoryStatus).HasMaxLength(255);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Seizures).HasMaxLength(255);

                entity.Property(e => e.Sensation).HasMaxLength(255);

                entity.Property(e => e.SurgeryInfo).HasMaxLength(255);

                entity.Property(e => e.Vision).HasMaxLength(255);
            });

            modelBuilder.Entity<OrthoSpinalAssessment>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Ortho_Spinal_Assessment");

                entity.Property(e => e.Assessment).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.LPfa)
                    .HasColumnName("L_PFA")
                    .HasMaxLength(50);

                entity.Property(e => e.Lumbar).HasMaxLength(50);

                entity.Property(e => e.Menarche).HasMaxLength(50);

                entity.Property(e => e.RPfa)
                    .HasColumnName("R_PFA")
                    .HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("refID");

                entity.Property(e => e.Risser).HasMaxLength(50);

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Sla1)
                    .HasColumnName("SLA_1")
                    .HasMaxLength(50);

                entity.Property(e => e.Sla2)
                    .HasColumnName("SLA_2")
                    .HasMaxLength(50);

                entity.Property(e => e.Sla3)
                    .HasColumnName("SLA_3")
                    .HasMaxLength(50);

                entity.Property(e => e.Spa)
                    .HasColumnName("SPA")
                    .HasMaxLength(50);

                entity.Property(e => e.Thoracic).HasMaxLength(50);
            });

            modelBuilder.Entity<PartsInformation>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Parts_Information");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Manufacturer).HasMaxLength(100);

                entity.Property(e => e.PartNo)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PartType)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.PicLink).HasColumnName("picLink");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Supplier).HasMaxLength(100);
            });

            modelBuilder.Entity<PatientVideoRecord>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Patient_Video_Record");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Duration).HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.TapeNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.TimeCode).HasMaxLength(50);
            });

            modelBuilder.Entity<PhysicalExamination>(entity =>
            {
                entity.HasKey(t => new { t.RefId });

                entity.ToTable("Physical_Examination");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.HandFunction).HasMaxLength(100);

                entity.Property(e => e.Llstrength)
                    .HasColumnName("LLStrength")
                    .HasMaxLength(100);

                entity.Property(e => e.MatAnkle).HasMaxLength(50);

                entity.Property(e => e.MatHeadPosition).HasMaxLength(50);

                entity.Property(e => e.MatHeadRot).HasMaxLength(50);

                entity.Property(e => e.MatHipAbdAdd).HasMaxLength(50);

                entity.Property(e => e.MatHipContracture).HasMaxLength(50);

                entity.Property(e => e.MatHipFlex).HasMaxLength(50);

                entity.Property(e => e.MatHipIntegrity).HasMaxLength(50);

                entity.Property(e => e.MatHipRotate).HasMaxLength(50);

                entity.Property(e => e.MatKneeContracture).HasMaxLength(50);

                entity.Property(e => e.MatKneePopliteal).HasMaxLength(50);

                entity.Property(e => e.MatPelvicAntTilt).HasMaxLength(50);

                entity.Property(e => e.MatPelvicAntTiltRange).HasMaxLength(50);

                entity.Property(e => e.MatPelvicPostTilt).HasMaxLength(50);

                entity.Property(e => e.MatPelvicPostTiltRange).HasMaxLength(50);

                entity.Property(e => e.MatPelvicRotL).HasMaxLength(50);

                entity.Property(e => e.MatPelvicRotR).HasMaxLength(50);

                entity.Property(e => e.MatPelvicRotRangeL).HasMaxLength(50);

                entity.Property(e => e.MatPelvicRotRangeR).HasMaxLength(50);

                entity.Property(e => e.MatPelvicSideFlexL).HasMaxLength(50);

                entity.Property(e => e.MatPelvicSideFlexR).HasMaxLength(50);

                entity.Property(e => e.MatPelvicSideFlexRangeL).HasMaxLength(50);

                entity.Property(e => e.MatPelvicSideFlexRangeR).HasMaxLength(50);

                entity.Property(e => e.MatSpine).HasMaxLength(50);

                entity.Property(e => e.MatSpinePri).HasMaxLength(50);

                entity.Property(e => e.MatSpineSec).HasMaxLength(50);

                entity.Property(e => e.Movement).HasMaxLength(100);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Reflexes).HasMaxLength(100);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SitHeadControl).HasMaxLength(50);

                entity.Property(e => e.SitHeadDrop).HasMaxLength(50);

                entity.Property(e => e.SitHeadFlex).HasMaxLength(50);

                entity.Property(e => e.SitHeadPreferToTurn).HasMaxLength(50);

                entity.Property(e => e.SitHeadTilt).HasMaxLength(50);

                entity.Property(e => e.SitHeadTiltFlexibility).HasMaxLength(50);

                entity.Property(e => e.SitHeadTiltSeverity).HasMaxLength(50);

                entity.Property(e => e.SitHumpLevel).HasMaxLength(50);

                entity.Property(e => e.SitKyphosis).HasMaxLength(50);

                entity.Property(e => e.SitKyphoticFlexibility).HasMaxLength(50);

                entity.Property(e => e.SitLordosis).HasMaxLength(50);

                entity.Property(e => e.SitLordoticFlexibility).HasMaxLength(50);

                entity.Property(e => e.SitLumbarConvexity).HasMaxLength(50);

                entity.Property(e => e.SitLumbarExtension).HasMaxLength(50);

                entity.Property(e => e.SitLumbarFlexibility).HasMaxLength(50);

                entity.Property(e => e.SitLumbarFlexion).HasMaxLength(50);

                entity.Property(e => e.SitLumbarSeverity).HasMaxLength(50);

                entity.Property(e => e.SitPelvicFlexibility).HasMaxLength(255);

                entity.Property(e => e.SitPelvicFlexibilityTilt).HasMaxLength(255);

                entity.Property(e => e.SitPelvicObliquity).HasMaxLength(50);

                entity.Property(e => e.SitPelvicRotation).HasMaxLength(50);

                entity.Property(e => e.SitPelvicTilt).HasMaxLength(50);

                entity.Property(e => e.SitRibHump).HasMaxLength(50);

                entity.Property(e => e.SitSpine).HasMaxLength(50);

                entity.Property(e => e.SitSpineRotation).HasMaxLength(50);

                entity.Property(e => e.SitThighsAdducted).HasMaxLength(50);

                entity.Property(e => e.SitThighsWindswept).HasMaxLength(50);

                entity.Property(e => e.SitThoracicConvexity).HasMaxLength(50);

                entity.Property(e => e.SitThoracicFlexibility).HasMaxLength(50);

                entity.Property(e => e.SitThoracicSeverity).HasMaxLength(50);

                entity.Property(e => e.SittingBalance).HasMaxLength(100);

                entity.Property(e => e.SkinCondition).HasMaxLength(50);

                entity.Property(e => e.Tone).HasMaxLength(50);

                entity.Property(e => e.Ulfunction)
                    .HasColumnName("ULFunction")
                    .HasMaxLength(100);

                entity.Property(e => e.Ulstrength)
                    .HasColumnName("ULStrength")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Ppmi>(entity =>
            {
                entity.HasKey(t => t.PpmiRegNo);

                entity.ToTable("PPMI");

                entity.Property(e => e.CounterSign)
                    .HasColumnName("counter_Sign")
                    .HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Funding).HasMaxLength(255);

                entity.Property(e => e.PpmiRegNo).HasColumnName("PPMI_RegNo");

                entity.Property(e => e.ResStaff)
                    .IsRequired()
                    .HasColumnName("res_Staff")
                    .HasMaxLength(50);

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(15);

                entity.Property(e => e.Status).HasMaxLength(50);
            });

            modelBuilder.Entity<PpmiItems>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("PPMI_Items");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.Item).HasMaxLength(155);

                entity.Property(e => e.PatientSelected).HasColumnName("Patient_Selected");

                entity.Property(e => e.PpmiRegNo).HasColumnName("PPMI_RegNo");

                entity.Property(e => e.QuotationNo)
                    .HasColumnName("Quotation_No")
                    .HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Specification).HasMaxLength(100);

                entity.Property(e => e.Supplier).HasMaxLength(255);
            });

            modelBuilder.Entity<ProblemObjectiveList>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Problem_Objective_List");

                entity.Property(e => e.Ambulation5).HasMaxLength(255);

                entity.Property(e => e.Ambulation6).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Deformity4).HasMaxLength(255);

                entity.Property(e => e.Deformity5).HasMaxLength(255);

                entity.Property(e => e.FunctionalSkills5).HasMaxLength(255);

                entity.Property(e => e.FunctionalSkills6).HasMaxLength(255);

                entity.Property(e => e.PressureArea3).HasMaxLength(255);

                entity.Property(e => e.PressureArea4).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SitPosture3).HasMaxLength(255);

                entity.Property(e => e.SitPosture4).HasMaxLength(255);

                entity.Property(e => e.SitTolerance4).HasMaxLength(255);

                entity.Property(e => e.SitTolerance5).HasMaxLength(255);

                entity.Property(e => e.Ulfunction1).HasColumnName("ULFunction1");

                entity.Property(e => e.Ulfunction2).HasColumnName("ULFunction2");

                entity.Property(e => e.Ulfunction3).HasColumnName("ULFunction3");

                entity.Property(e => e.Ulfunction4)
                    .HasColumnName("ULFunction4")
                    .HasMaxLength(255);

                entity.Property(e => e.Ulfunction5)
                    .HasColumnName("ULFunction5")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<ProgressNote>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Progress_Note");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Note).IsRequired();

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Therapist)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<QuestChTValidation>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("QUEST_ChT_Validation");

                entity.Property(e => e.ClinicNo)
                    .HasColumnName("Clinic_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.DeviceName)
                    .HasColumnName("Device_Name")
                    .HasMaxLength(255);

                entity.Property(e => e.DeviceQ1).HasColumnName("Device_Q1");

                entity.Property(e => e.DeviceQ2).HasColumnName("Device_Q2");

                entity.Property(e => e.DeviceQ3).HasColumnName("Device_Q3");

                entity.Property(e => e.DeviceQ4).HasColumnName("Device_Q4");

                entity.Property(e => e.DeviceQ5).HasColumnName("Device_Q5");

                entity.Property(e => e.DeviceQ6).HasColumnName("Device_Q6");

                entity.Property(e => e.DeviceQ7).HasColumnName("Device_Q7");

                entity.Property(e => e.DeviceQ8).HasColumnName("Device_Q8");

                entity.Property(e => e.DurationUseMonth).HasColumnName("Duration_Use_Month");

                entity.Property(e => e.Important1).HasColumnName("Important_1");

                entity.Property(e => e.Important2).HasColumnName("Important_2");

                entity.Property(e => e.Important3).HasColumnName("Important_3");

                entity.Property(e => e.RefId).HasColumnName("refID");

                entity.Property(e => e.ServiceQ1).HasColumnName("Service_Q1");

                entity.Property(e => e.ServiceQ2).HasColumnName("Service_Q2");

                entity.Property(e => e.ServiceQ3).HasColumnName("Service_Q3");

                entity.Property(e => e.ServiceQ4).HasColumnName("Service_Q4");

                entity.Property(e => e.User).HasMaxLength(255);

                entity.Property(e => e.Verson).HasMaxLength(50);
            });

            modelBuilder.Entity<QuestWcb>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("QUEST_WCB");

                entity.Property(e => e.ClinicNo)
                    .HasColumnName("Clinic_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.DeviceName)
                    .HasColumnName("Device_Name")
                    .HasMaxLength(255);

                entity.Property(e => e.DeviceQ1).HasColumnName("Device_Q1");

                entity.Property(e => e.DeviceQ2).HasColumnName("Device_Q2");

                entity.Property(e => e.DeviceQ3).HasColumnName("Device_Q3");

                entity.Property(e => e.DeviceQ4).HasColumnName("Device_Q4");

                entity.Property(e => e.DeviceQ5).HasColumnName("Device_Q5");

                entity.Property(e => e.DeviceQ6).HasColumnName("Device_Q6");

                entity.Property(e => e.DeviceQ7).HasColumnName("Device_Q7");

                entity.Property(e => e.DeviceQ8).HasColumnName("Device_Q8");

                entity.Property(e => e.DurationUseMonth).HasColumnName("Duration_Use_Month");

                entity.Property(e => e.Important1).HasColumnName("Important_1");

                entity.Property(e => e.Important2).HasColumnName("Important_2");

                entity.Property(e => e.Important3).HasColumnName("Important_3");

                entity.Property(e => e.RefId).HasColumnName("refID");

                entity.Property(e => e.ServiceQ1).HasColumnName("Service_Q1");

                entity.Property(e => e.ServiceQ2).HasColumnName("Service_Q2");

                entity.Property(e => e.ServiceQ3).HasColumnName("Service_Q3");

                entity.Property(e => e.ServiceQ4).HasColumnName("Service_Q4");

                entity.Property(e => e.User).HasMaxLength(255);

                entity.Property(e => e.Verson).HasMaxLength(50);
            });

            modelBuilder.Entity<SchoolList>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("School_List");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Region).HasMaxLength(255);

                entity.Property(e => e.SchoolName).HasMaxLength(255);
            });

            modelBuilder.Entity<SeatingSystemPrescription>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Seating_System_Prescription");

                entity.Property(e => e.AbductorWedge).HasMaxLength(50);

                entity.Property(e => e.AdductorWedge).HasMaxLength(50);

                entity.Property(e => e.BackCushionDensity).HasMaxLength(50);

                entity.Property(e => e.BackCushionType).HasMaxLength(50);

                entity.Property(e => e.BackModification).HasMaxLength(50);

                entity.Property(e => e.BackrestType).HasMaxLength(50);

                entity.Property(e => e.ChairType).HasMaxLength(10);

                entity.Property(e => e.CushionCover).HasMaxLength(50);

                entity.Property(e => e.CushionDensity).HasMaxLength(50);

                entity.Property(e => e.CushionModification).HasMaxLength(50);

                entity.Property(e => e.CushionType).HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.FrameType).HasMaxLength(50);

                entity.Property(e => e.FullSystemChanges).HasMaxLength(50);

                entity.Property(e => e.HeadSupport).HasMaxLength(50);

                entity.Property(e => e.KneeSupport).HasMaxLength(50);

                entity.Property(e => e.LateralSupport).HasMaxLength(50);

                entity.Property(e => e.LumbarSupport).HasMaxLength(50);

                entity.Property(e => e.PelvicStablizer).HasMaxLength(50);

                entity.Property(e => e.PelvicSupport).HasMaxLength(50);

                entity.Property(e => e.PtHaveWc)
                    .HasColumnName("PtHaveWC")
                    .HasMaxLength(50);

                entity.Property(e => e.PtPruchaseWc)
                    .HasColumnName("PtPruchaseWC")
                    .HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SeatBase).HasMaxLength(50);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.SeatToBack).HasMaxLength(50);

                entity.Property(e => e.ShoulderSupport).HasMaxLength(50);

                entity.Property(e => e.SpecialItem1).HasMaxLength(50);

                entity.Property(e => e.SpecialItem2).HasMaxLength(50);

                entity.Property(e => e.SpecialItem3).HasMaxLength(50);

                entity.Property(e => e.SpecialItem4).HasMaxLength(50);

                entity.Property(e => e.SpecialItem5).HasMaxLength(50);

                entity.Property(e => e.SpecialItem6).HasMaxLength(50);

                entity.Property(e => e.SpecialItem7).HasMaxLength(50);

                entity.Property(e => e.SpinalBrace).HasMaxLength(50);
            });

            modelBuilder.Entity<SocialInformation>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Social_Information");

                entity.Property(e => e.Accommodation).HasMaxLength(255);

                entity.Property(e => e.Caretaker).HasMaxLength(50);

                entity.Property(e => e.Company).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.JobTask).HasMaxLength(255);

                entity.Property(e => e.LapTrayFor).HasMaxLength(255);

                entity.Property(e => e.OtherAdaptiveEquipment).HasMaxLength(255);

                entity.Property(e => e.OtherSchoolEquip).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.SchoolEquip1).HasMaxLength(255);

                entity.Property(e => e.SchoolEquip2).HasMaxLength(255);

                entity.Property(e => e.SchoolEquip3).HasMaxLength(255);

                entity.Property(e => e.SchoolName).HasMaxLength(255);

                entity.Property(e => e.SchoolType).HasMaxLength(50);

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.Therapist).HasMaxLength(50);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email)
                    .HasColumnName("EMail")
                    .HasMaxLength(50);

                entity.Property(e => e.Last).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Supplier1)
                    .IsRequired()
                    .HasColumnName("Supplier")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<SwitchboardItems>(entity =>
            {
                entity.HasKey(t => t.SwitchboardId);

                entity.ToTable("Switchboard Items");

                entity.Property(e => e.Argument).HasMaxLength(255);

                entity.Property(e => e.ItemText).HasMaxLength(255);

                entity.Property(e => e.SwitchboardId).HasColumnName("SwitchboardID");
            });

            modelBuilder.Entity<VideoTapeLibrary>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Video_Tape_Library");

                entity.Property(e => e.DateRecording).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.TapeNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.TimeCode).HasMaxLength(50);
            });

            modelBuilder.Entity<WcBankManagementDistrictCluster>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("wcBankManagement_District_Cluster");

                entity.Property(e => e.Cluster).HasMaxLength(50);

                entity.Property(e => e.District).HasMaxLength(50);

                entity.Property(e => e.RefId).HasColumnName("refID");
            });

            modelBuilder.Entity<WcBankManagementSeatSupportLevel>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("wcBankManagement_seat_support_level");

                entity.Property(e => e.Code).HasColumnName("code");

                entity.Property(e => e.RefId).HasColumnName("refID");

                entity.Property(e => e.SupportLevel)
                    .IsRequired()
                    .HasColumnName("support_level")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<WheelchairAccidentReport>(entity =>
            {
                entity.HasKey(t => t.ReportNo);

                entity.ToTable("Wheelchair_Accident_Report");

                entity.Property(e => e.AccidentDate)
                    .HasColumnName("Accident_Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Action).HasMaxLength(255);

                entity.Property(e => e.InjuryDescription)
                    .HasColumnName("Injury_Description")
                    .HasMaxLength(255);

                entity.Property(e => e.ReportNo).HasColumnName("Report_No");

                entity.Property(e => e.ReportedDate)
                    .HasColumnName("Reported Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.SeatNo)
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.WheelchairNo)
                    .HasColumnName("Wheelchair No")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<WheelchairDimension>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Wheelchair_Dimension");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.LarmrestHeight).HasColumnName("LArmrestHeight");

                entity.Property(e => e.LlateralSupportHeight).HasColumnName("LLateralSupportHeight");

                entity.Property(e => e.LlegrestFootrestAngle).HasColumnName("LLegrestFootrestAngle");

                entity.Property(e => e.LlegrestLength).HasColumnName("LLegrestLength");

                entity.Property(e => e.LseatToLegrestAngle).HasColumnName("LSeatToLegrestAngle");

                entity.Property(e => e.RarmrestHeight).HasColumnName("RArmrestHeight");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.RlateralSupportHeight).HasColumnName("RLateralSupportHeight");

                entity.Property(e => e.RlegrestFootrestAngle).HasColumnName("RLegrestFootrestAngle");

                entity.Property(e => e.RlegrestLength).HasColumnName("RLegrestLength");

                entity.Property(e => e.RseatToLegrestAngle).HasColumnName("RSeatToLegrestAngle");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);

                entity.Property(e => e.WclseatDepth).HasColumnName("WCLSeatDepth");

                entity.Property(e => e.WcrseatDepth).HasColumnName("WCRSeatDepth");

                entity.Property(e => e.WcseatHeight).HasColumnName("WCSeatHeight");

                entity.Property(e => e.WcseatWidth).HasColumnName("WCSeatWidth");
            });

            modelBuilder.Entity<WheelchairInformation>(entity =>
            {
                entity.HasKey(t => t.WheelchairNo);

                entity.ToTable("Wheelchair_Information");

                entity.Property(e => e.AcqusitionDate).HasColumnType("datetime");

                entity.Property(e => e.Color).HasMaxLength(12);

                entity.Property(e => e.CondemnDate)
                    .HasColumnName("condemnDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ElevatingFr).HasColumnName("ElevatingFR");

                entity.Property(e => e.FundedBy).HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.RearWheelSize).HasMaxLength(3);

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.Supplier).HasMaxLength(50);

                entity.Property(e => e.WheelchairModel)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.WheelchairNo)
                    .IsRequired()
                    .HasMaxLength(6);
            });

            modelBuilder.Entity<WheelchairSpecification>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Wheelchair_Specification");

                entity.Property(e => e.CatalogLink).HasColumnName("CatalogLink");

                entity.Property(e => e.CurPrice)
                    .HasColumnName("curPrice")
                    .HasColumnType("money");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.WcPicLink).HasColumnName("wcPicLink");

                entity.Property(e => e.WheelchairModel)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<WorkOrder>(entity =>
            {
                entity.HasKey(t => t.OrderNo);

                entity.ToTable("Work_Order");

                entity.Property(e => e.OrderDate)
                    .HasColumnName("Order_Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.OrderNo).HasColumnName("Order_No");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasColumnName("Seat_No")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<WorkOrderItems>(entity =>
            {
                entity.HasKey(t => t.RefId);

                entity.ToTable("Work_Order_Items");

                entity.Property(e => e.CompletionDate)
                    .HasColumnName("Completion_Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Item)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.OrderDate)
                    .HasColumnName("Order_Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.OrderNo).HasColumnName("Order_No");

                entity.Property(e => e.RefId).HasColumnName("ref_ID");

                entity.Property(e => e.Staff)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.ToTable("Account");

                entity.Property(e => e.UserName).HasColumnName("UserName");

                entity.Property(e => e.Password).HasColumnName("Password");

                entity.Property(e => e.Role).HasColumnName("Role");

                entity.Property(e => e.CreatedBy).HasColumnName("CreatedBy");

                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate").HasColumnType("datetime"); 

                entity.Property(e => e.ModifiedBy).HasColumnName("ModifiedBy");

                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate").HasColumnType("datetime"); ;


            });

            modelBuilder.Entity<UserLogin>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.ToTable("UserLogin");

                entity.Property(e => e.UserName).HasColumnName("UserName");

                entity.Property(e => e.Password).HasColumnName("Password");

                entity.Property(e => e.FullName).HasColumnName("FullName");

                entity.Property(e => e.Password).HasColumnName("Password");

                entity.Property(e => e.UserRole).HasColumnName("UserRole");


            });




            

            OnModelCreatingPartial(modelBuilder);
        }



        
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
