using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class FundingInformation
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " Donor Should be maximum of 255 characters")]
        public string Donor { get; set; }
        public DateTime DateDonation { get; set; }

        [StringLength(255, ErrorMessage = " Funding Activity Should be maximum of 255 characters")]
        public string FundingActivity { get; set; }
        public decimal Amount { get; set; }

        [StringLength(255, ErrorMessage = " Funding Activity Should be maximum of 255 characters")]
        public string CollectingProjectTitle { get; set; }

        public int? CollectingProjectCode { get; set; }

        [StringLength(255, ErrorMessage = " Funding Activity Should be maximum of 255 characters")]
        public string ProposedUseFunding { get; set; }
    }
}
