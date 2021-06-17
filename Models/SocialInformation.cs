using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class SocialInformation
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(255, ErrorMessage = " Accommodation Should be maximum of 255 characters")]
        public string Accommodation { get; set; }
        public int? Area { get; set; }
        public int? DoorWidth { get; set; }
        public bool SmallRoomSpace { get; set; }
        public int? StepsOutside { get; set; }
        public int? KerbsOutside { get; set; }
        public bool RampsOutside { get; set; }
        public bool LiftLanding { get; set; }

        [StringLength(50, ErrorMessage = " Accommodation Should be maximum of 50 characters")]
        public string Caretaker { get; set; }

        [StringLength(50, ErrorMessage = " SchoolName Should be maximum of 50 characters")]
        public string SchoolName { get; set; }

        [StringLength(50, ErrorMessage = " Therapist Should be maximum of 50 characters")]
        public string Therapist { get; set; }
        public float? ContactNo { get; set; }
        public string SchoolType { get; set; }
        public bool Residental { get; set; }

        [StringLength(255, ErrorMessage = " SchoolEquip1 Should be maximum of 255 characters")]
        public string SchoolEquip1 { get; set; }

        [StringLength(255, ErrorMessage = " SchoolEquip2 Should be maximum of 255 characters")]
        public string SchoolEquip2 { get; set; }

        [StringLength(255, ErrorMessage = " SchoolEquip3 Should be maximum of 255 characters")]
        public string SchoolEquip3 { get; set; }

        [StringLength(255, ErrorMessage = " OtherSchoolEquip Should be maximum of 255 characters")]
        public string OtherSchoolEquip { get; set; }
        public int? SchoolTableHeight { get; set; }
        public int? SchoolTableKneeClearance { get; set; }

        [StringLength(255, ErrorMessage = " LapTrayFor Should be maximum of 255 characters")]
        public string LapTrayFor { get; set; }

        [StringLength(255, ErrorMessage = " Company Should be maximum of 255 characters")]
        public string Company { get; set; }

        [StringLength(255, ErrorMessage = " JobTask Should be maximum of 255 characters")]
        public string JobTask { get; set; }
        public int? CompanyTableHeight { get; set; }
        public int? CompanyTableKneeClearance { get; set; }

        [StringLength(255, ErrorMessage = " OtherAdaptiveEquipment Should be maximum of 255 characters")]
        public string OtherAdaptiveEquipment { get; set; }

        [StringLength(255, ErrorMessage = " Notes Should be maximum of 255 characters")]
        public string Notes { get; set; }
    }
}
