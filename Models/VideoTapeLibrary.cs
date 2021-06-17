using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class VideoTapeLibrary
    {
        [Required]
        [Key]
        public int RefId { get; set; }


        [StringLength(50, ErrorMessage = " TapeNo Should be maximum of 50 characters")]
        public string TapeNo { get; set; }
        public int Index { get; set; }

        [StringLength(50, ErrorMessage = " TimeCode Should be maximum of 50 characters")]
        public string TimeCode { get; set; }
        public DateTime DateRecording { get; set; }

        [StringLength(255, ErrorMessage = " Description Should be maximum of 255 characters")]
        public string Description { get; set; }
    }
}
