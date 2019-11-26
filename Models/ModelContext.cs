using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace no_mas_accidentes.Models12
{
    public partial class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accident> Accident { get; set; }
        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<Consultation> Consultation { get; set; }
        public virtual DbSet<Contract> Contract { get; set; }
        public virtual DbSet<Improve> Improve { get; set; }
        public virtual DbSet<Pay> Pay { get; set; }
        public virtual DbSet<RequestActivities> RequestActivities { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Visit> Visit { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseOracle("User Id=portafolio2;Password=123;Data Source=localhost:1521/xe;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:DefaultSchema", "PORTAFOLIO2");

            modelBuilder.Entity<Accident>(entity =>
            {
                entity.ToTable("ACCIDENT");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ACCIDENT_PK1")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateAccident)
                    .HasColumnName("DATE_ACCIDENT")
                    .HasColumnType("DATE");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Resumen)
                    .IsRequired()
                    .HasColumnName("RESUMEN")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Severity)
                    .IsRequired()
                    .HasColumnName("SEVERITY")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Accident)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY_FK1");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Rut)
                    .HasName("ID_COMPANY_PK");

                entity.ToTable("COMPANY");

                entity.HasIndex(e => e.Rut)
                    .HasName("ID_COMPANY_PK")
                    .IsUnique();

                entity.Property(e => e.Rut)
                    .HasColumnName("RUT")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("ADDRESS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.ComercialBusiness)
                    .IsRequired()
                    .HasColumnName("COMERCIAL_BUSINESS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.IdRole)
                    .HasColumnName("ID_ROLE")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasColumnType("LONG");

                entity.Property(e => e.SocialReason)
                    .IsRequired()
                    .HasColumnName("SOCIAL_REASON")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Company)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_ROLE_COMPANY_FK");
            });

            modelBuilder.Entity<Consultation>(entity =>
            {
                entity.ToTable("CONSULTATION");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ASESORY_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateAsesory)
                    .HasColumnName("DATE_ASESORY")
                    .HasColumnType("DATE");

                entity.Property(e => e.Extra)
                    .IsRequired()
                    .HasColumnName("EXTRA")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.IdProfesional)
                    .HasColumnName("ID_PROFESIONAL")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Resumen)
                    .IsRequired()
                    .HasColumnName("RESUMEN")
                    .HasColumnType("NVARCHAR2(1000)");

                entity.Property(e => e.RutCompany)
                    .HasColumnName("RUT_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("STATUS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdProfesionalNavigation)
                    .WithMany(p => p.Consultation)
                    .HasForeignKey(d => d.IdProfesional)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_PROFESSIONAL_FK1");

                entity.HasOne(d => d.RutCompanyNavigation)
                    .WithMany(p => p.Consultation)
                    .HasForeignKey(d => d.RutCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY_FK_CONSULTATION");
            });

            modelBuilder.Entity<Contract>(entity =>
            {
                entity.ToTable("CONTRACT");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_CONTRACT_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateExpired)
                    .HasColumnName("DATE_EXPIRED")
                    .HasColumnType("DATE");

                entity.Property(e => e.NumberAsesory)
                    .HasColumnName("NUMBER_ASESORY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.NumberVisit)
                    .HasColumnName("NUMBER_VISIT")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Price)
                    .HasColumnName("PRICE")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.RutCompany)
                    .HasColumnName("RUT_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("STATUS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.RutCompanyNavigation)
                    .WithMany(p => p.Contract)
                    .HasForeignKey(d => d.RutCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RUT_COMPANY_CONTRACT");
            });

            modelBuilder.Entity<Improve>(entity =>
            {
                entity.ToTable("IMPROVE");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_IMPROVE_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.TypeImprove)
                    .IsRequired()
                    .HasColumnName("TYPE_IMPROVE")
                    .HasColumnType("NVARCHAR2(255)");
            });

            modelBuilder.Entity<Pay>(entity =>
            {
                entity.ToTable("PAY");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_PAY_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Cost)
                    .HasColumnName("COST")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.DatePay)
                    .HasColumnName("DATE_PAY")
                    .HasColumnType("DATE");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Pay)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY2");
            });

            modelBuilder.Entity<RequestActivities>(entity =>
            {
                entity.ToTable("REQUEST_ACTIVITIES");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_REQUEST_ACTIVITIES_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.RequestActivities)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY3");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_ROLE_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("TASK");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_TASK_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description)
                    .HasColumnName("DESCRIPTION")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("STATUS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.TypeTask)
                    .IsRequired()
                    .HasColumnName("TYPE_TASK")
                    .HasColumnType("NVARCHAR2(255)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Run)
                    .HasName("ID_USER_PK");

                entity.ToTable("user");

                entity.HasIndex(e => e.Run)
                    .HasName("ID_USER_PK")
                    .IsUnique();

                entity.Property(e => e.Run)
                    .HasColumnName("RUN")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.IdRole)
                    .HasColumnName("ID_ROLE")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasColumnName("LASTNAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasColumnType("LONG");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_ROL_FK");
            });

            modelBuilder.Entity<Visit>(entity =>
            {
                entity.ToTable("VISIT");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_VISIT_PK")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("NUMBER(38)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateVisit)
                    .HasColumnName("DATE_VISIT")
                    .HasColumnType("DATE");

                entity.Property(e => e.Extra)
                    .IsRequired()
                    .HasColumnName("EXTRA")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.IdCompany)
                    .HasColumnName("ID_COMPANY")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.IdProfessional)
                    .HasColumnName("ID_PROFESSIONAL")
                    .HasColumnType("NUMBER(38)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasColumnType("NVARCHAR2(255)");

                entity.Property(e => e.Resumen)
                    .IsRequired()
                    .HasColumnName("RESUMEN")
                    .HasColumnType("NVARCHAR2(1000)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("STATUS")
                    .HasColumnType("NVARCHAR2(255)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Visit)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_COMPANY_FK");

                entity.HasOne(d => d.IdProfessionalNavigation)
                    .WithMany(p => p.Visit)
                    .HasForeignKey(d => d.IdProfessional)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ID_PROFESSIONAL_FK");
            });

            modelBuilder.HasSequence("ISEQ$$_74661");

            modelBuilder.HasSequence("ISEQ$$_74666");

            modelBuilder.HasSequence("ISEQ$$_74668");

            modelBuilder.HasSequence("ISEQ$$_74673");

            modelBuilder.HasSequence("ISEQ$$_74676");

            modelBuilder.HasSequence("ISEQ$$_74679");

            modelBuilder.HasSequence("ISEQ$$_74682");

            modelBuilder.HasSequence("ISEQ$$_74685");

            modelBuilder.HasSequence("ISEQ$$_74899");

            modelBuilder.HasSequence("ISEQ$$_74901");

            modelBuilder.HasSequence("ISEQ$$_74904");

            modelBuilder.HasSequence("ISEQ$$_74907");

            modelBuilder.HasSequence("ISEQ$$_74910");

            modelBuilder.HasSequence("ISEQ$$_74913");

            modelBuilder.HasSequence("ISEQ$$_74916");

            modelBuilder.HasSequence("ISEQ$$_74919");

            modelBuilder.HasSequence("ISEQ$$_74932");

            modelBuilder.HasSequence("ISEQ$$_74935");

            modelBuilder.HasSequence("ISEQ$$_74938");

            modelBuilder.HasSequence("ISEQ$$_74941");

            modelBuilder.HasSequence("ISEQ$$_74944");

            modelBuilder.HasSequence("ISEQ$$_74947");

            modelBuilder.HasSequence("ISEQ$$_74951");

            modelBuilder.HasSequence("ISEQ$$_74954");

            modelBuilder.HasSequence("ISEQ$$_74957");

            modelBuilder.HasSequence("ISEQ$$_74960");

            modelBuilder.HasSequence("ISEQ$$_74963");

            modelBuilder.HasSequence("ISEQ$$_75559");

            modelBuilder.HasSequence("ISEQ$$_75655");

            modelBuilder.HasSequence("ISEQ$$_75853");

            modelBuilder.HasSequence("ISEQ$$_75856");

            modelBuilder.HasSequence("ISEQ$$_75859");

            modelBuilder.HasSequence("ISEQ$$_75862");

            modelBuilder.HasSequence("ISEQ$$_75865");

            modelBuilder.HasSequence("ISEQ$$_75867");

            modelBuilder.HasSequence("ISEQ$$_75869");

            modelBuilder.HasSequence("ISEQ$$_75871");

            modelBuilder.HasSequence("ISEQ$$_75881");

            modelBuilder.HasSequence("ISEQ$$_75884");

            modelBuilder.HasSequence("ISEQ$$_75887");

            modelBuilder.HasSequence("ISEQ$$_75890");

            modelBuilder.HasSequence("ISEQ$$_75893");

            modelBuilder.HasSequence("ISEQ$$_75896");

            modelBuilder.HasSequence("ISEQ$$_75899");

            modelBuilder.HasSequence("ISEQ$$_75902");

            modelBuilder.HasSequence("ISEQ$$_76191");

            modelBuilder.HasSequence("ISEQ$$_76194");

            modelBuilder.HasSequence("ISEQ$$_76197");

            modelBuilder.HasSequence("ISEQ$$_76200");

            modelBuilder.HasSequence("ISEQ$$_76203");

            modelBuilder.HasSequence("ISEQ$$_76206");

            modelBuilder.HasSequence("ISEQ$$_76209");

            modelBuilder.HasSequence("ISEQ$$_76212");

            modelBuilder.HasSequence("ISEQ$$_76215");

            modelBuilder.HasSequence("ISEQ$$_76226");

            modelBuilder.HasSequence("ISEQ$$_76229");

            modelBuilder.HasSequence("ISEQ$$_76232");

            modelBuilder.HasSequence("ISEQ$$_76235");

            modelBuilder.HasSequence("ISEQ$$_76238");

            modelBuilder.HasSequence("ISEQ$$_76241");

            modelBuilder.HasSequence("ISEQ$$_76244");

            modelBuilder.HasSequence("ISEQ$$_76247");

            modelBuilder.HasSequence("ISEQ$$_76405");

            modelBuilder.HasSequence("ISEQ$$_76410");

            modelBuilder.HasSequence("ISEQ$$_76413");

            modelBuilder.HasSequence("ISEQ$$_76422");

            modelBuilder.HasSequence("ISEQ$$_76425");

            modelBuilder.HasSequence("ISEQ$$_76428");

            modelBuilder.HasSequence("ISEQ$$_76434");

            modelBuilder.HasSequence("ISEQ$$_76511");

            modelBuilder.HasSequence("ISEQ$$_76521");

            modelBuilder.HasSequence("ISEQ$$_76524");

            modelBuilder.HasSequence("ISEQ$$_76529");

            modelBuilder.HasSequence("ISEQ$$_76536");

            modelBuilder.HasSequence("ISEQ$$_76539");

            modelBuilder.HasSequence("ISEQ$$_76542");

            modelBuilder.HasSequence("ISEQ$$_76545");

            modelBuilder.HasSequence("ISEQ$$_76548");

            modelBuilder.HasSequence("ISEQ$$_76551");

            modelBuilder.HasSequence("ISEQ$$_76554");

            modelBuilder.HasSequence("ISEQ$$_76557");

            modelBuilder.HasSequence("ISEQ$$_76576");

            modelBuilder.HasSequence("ISEQ$$_76583");

            modelBuilder.HasSequence("ISEQ$$_76586");

            modelBuilder.HasSequence("ISEQ$$_76589");

            modelBuilder.HasSequence("ISEQ$$_76592");

            modelBuilder.HasSequence("ISEQ$$_76595");

            modelBuilder.HasSequence("ISEQ$$_76598");

            modelBuilder.HasSequence("ISEQ$$_76601");

            modelBuilder.HasSequence("ISEQ$$_76604");

            modelBuilder.HasSequence("ISEQ$$_77461");

            modelBuilder.HasSequence("ISEQ$$_77508");

            modelBuilder.HasSequence("ISEQ$$_77515");

            modelBuilder.HasSequence("ISEQ$$_77518");

            modelBuilder.HasSequence("ISEQ$$_77521");

            modelBuilder.HasSequence("ISEQ$$_77524");

            modelBuilder.HasSequence("ISEQ$$_77527");

            modelBuilder.HasSequence("ISEQ$$_77530");

            modelBuilder.HasSequence("ISEQ$$_77533");

            modelBuilder.HasSequence("ISEQ$$_77536");

            modelBuilder.HasSequence("ISEQ$$_77579");

            modelBuilder.HasSequence("ISEQ$$_77586");

            modelBuilder.HasSequence("ISEQ$$_77589");

            modelBuilder.HasSequence("ISEQ$$_77592");

            modelBuilder.HasSequence("ISEQ$$_77595");

            modelBuilder.HasSequence("ISEQ$$_77598");

            modelBuilder.HasSequence("ISEQ$$_77601");

            modelBuilder.HasSequence("ISEQ$$_77604");

            modelBuilder.HasSequence("ISEQ$$_77607");

            modelBuilder.HasSequence("ISEQ$$_77793");

            modelBuilder.HasSequence("ISEQ$$_77964");

            modelBuilder.HasSequence("ISEQ$$_78389");

            modelBuilder.HasSequence("ISEQ$$_78392");

            modelBuilder.HasSequence("ISEQ$$_81993");

            modelBuilder.HasSequence("ISEQ$$_81996");

            modelBuilder.HasSequence("ISEQ$$_82003");

            modelBuilder.HasSequence("ISEQ$$_82010");

            modelBuilder.HasSequence("ISEQ$$_82013");

            modelBuilder.HasSequence("ISEQ$$_82016");

            modelBuilder.HasSequence("ISEQ$$_82019");

            modelBuilder.HasSequence("ISEQ$$_82022");

            modelBuilder.HasSequence("ISEQ$$_82025");

            modelBuilder.HasSequence("ISEQ$$_82028");

            modelBuilder.HasSequence("ISEQ$$_82031");
        }
    }
}
