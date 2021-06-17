using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WcBankManagementDistrictCluster
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " District Should be maximum of 50 characters")]
        public string District { get; set; }

        [StringLength(50, ErrorMessage = " Cluster Should be maximum of 50 characters")]
        public string Cluster { get; set; }
    }
}
