using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class ProgressNote
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime? Date { get; set; }

        [StringLength(255, ErrorMessage = " Note Should be maximum of 255 characters")]
        public string Note { get; set; }

        [StringLength(255, ErrorMessage = " Therapist Should be maximum of 255 characters")]
        public string Therapist { get; set; }

        [StringLength(255, ErrorMessage = " Hardcopy Should be maximum of 255 characters")]
        public string Hardcopy { get; set; }
    }
}
