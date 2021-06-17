using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WheelchairAccidentReport
    {
        [Required]
        [Key]
        public int ReportNo { get; set; }
        public DateTime? ReportedDate { get; set; }

        [StringLength(50, ErrorMessage = " PaymentType Should be maximum of 50 characters")]
        public string SeatNo { get; set; }

        [StringLength(50, ErrorMessage = " PaymentType Should be maximum of 50 characters")]
        public string WheelchairNo { get; set; }
        public DateTime? AccidentDate { get; set; }

        [StringLength(255, ErrorMessage = " PaymentType Should be maximum of 255 characters")]
        public string Details { get; set; }
        public bool Injury { get; set; }

        [StringLength(255, ErrorMessage = " InjuryDescription Should be maximum of 255 characters")]
        public string InjuryDescription { get; set; }

        [StringLength(255, ErrorMessage = " Action Should be maximum of 255 characters")]
        public string Action { get; set; }
    }
}
