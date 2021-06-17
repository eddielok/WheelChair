using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class QuestChTValidation
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " DeviceName Should be maximum of 255 characters")]
        public string DeviceName { get; set; }
        public int? DurationUseMonth { get; set; }

        [StringLength(255, ErrorMessage = " User Should be maximum of 255 characters")]
        public string User { get; set; }

        [StringLength(255, ErrorMessage = " ClinicNo Should be maximum of 255 characters")]
        public string ClinicNo { get; set; }
        public DateTime? Date { get; set; }
        public string Verson { get; set; }
        public int? DeviceQ1 { get; set; }
        public int? DeviceQ2 { get; set; }
        public int? DeviceQ3 { get; set; }
        public int? DeviceQ4 { get; set; }
        public int? DeviceQ5 { get; set; }
        public int? DeviceQ6 { get; set; }
        public int? DeviceQ7 { get; set; }
        public int? DeviceQ8 { get; set; }
        public int? ServiceQ1 { get; set; }
        public int? ServiceQ2 { get; set; }
        public int? ServiceQ3 { get; set; }
        public int? ServiceQ4 { get; set; }
        public int? Important1 { get; set; }
        public int? Important2 { get; set; }
        public int? Important3 { get; set; }

        [StringLength(255, ErrorMessage = " Remarks Should be maximum of 255 characters")]
        public string Remarks { get; set; }
    }
}
