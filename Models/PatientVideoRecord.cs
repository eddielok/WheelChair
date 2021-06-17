using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class PatientVideoRecord
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }

        [StringLength(50, ErrorMessage = " TapeNo Should be maximum of 50 characters")]
        public string TapeNo { get; set; }

        public int Index { get; set; }

        [StringLength(50, ErrorMessage = " TimeCode Should be maximum of 50 characters")]
        public string TimeCode { get; set; }

        [StringLength(50, ErrorMessage = " Duration Should be maximum of 50 characters")]
        public string Duration { get; set; }
        public DateTime Date { get; set; }

        [StringLength(255, ErrorMessage = " Description Should be maximum of 255 characters")]
        public string Description { get; set; }
    }
}
