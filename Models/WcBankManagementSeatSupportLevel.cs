using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WcBankManagementSeatSupportLevel
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " SupportLevel Should be maximum of 50 characters")]
        public string SupportLevel { get; set; }
        public int Code { get; set; }
    }
}
