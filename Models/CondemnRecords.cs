using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class CondemnRecords
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " Item No Should be maximum of 255 characters")]

        public string ItemNo { get; set; }

        [StringLength(50, ErrorMessage = " Item Description Should be maximum of 255 characters")]
        public string ItemDescription { get; set; }

        [StringLength(50, ErrorMessage = " Type Should be maximum of 255 characters")]
        public string Type { get; set; }
        public DateTime? AcqDate { get; set; }
        public DateTime CondemnDate { get; set; }

        [StringLength(255, ErrorMessage = " Condemn Reason Should be maximum of 255 characters")]
        public string CondemnReason { get; set; }

        [StringLength(255, ErrorMessage = " Remarks Should be maximum of 255 characters")]
        public string Remarks { get; set; }
    }
}
