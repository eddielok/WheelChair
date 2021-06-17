using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class SwitchboardItems
    {

        [Required]
        [Key]
        public int? SwitchboardId { get; set; }
        public short? ItemNumber { get; set; }

        [StringLength(255, ErrorMessage = " ItemText Item Should be maximum of 255 characters")]
        public string ItemText { get; set; }
        public short? Command { get; set; }

        [StringLength(255, ErrorMessage = " Argument Item Should be maximum of 255 characters")]
        public string Argument { get; set; }
    }
}
