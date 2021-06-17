using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class Ppmi
    {
        [Required]
        [Key]
        public int PpmiRegNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(15, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }

        [StringLength(255, ErrorMessage = " Reason Should be maximum of 50 characters")]
        public string Reason { get; set; }

        [StringLength(255, ErrorMessage = " Funding Should be maximum of 255 characters")]
        public string Funding { get; set; }

        [StringLength(50, ErrorMessage = " Status Should be maximum of 50 characters")]
        public string Status { get; set; }

        [StringLength(255, ErrorMessage = " Quotation Should be maximum of 255 characters")]
        public string Quotation { get; set; }

        [StringLength(50, ErrorMessage = " ResStaff Should be maximum of 50 characters")]
        public string ResStaff { get; set; }

        [StringLength(50, ErrorMessage = " CounterSign Should be maximum of 50 characters")]
        public string CounterSign { get; set; }
    }
}
