using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class LoanInformation
    {
        [Required]
        [Key]
        public string LoanFormNo { get; set; }

        [StringLength(13, ErrorMessage = " SeatNo Should be maximum of 13 characters")]
        public string SeatNo { get; set; }

        [StringLength(255, ErrorMessage = " Patient Name Should be maximum of 255 characters")]
        public string PatientName { get; set; }

        [StringLength(255, ErrorMessage = " Borrower Name Should be maximum of 255 characters")]
        public string BorrowerName { get; set; }

        [StringLength(11, ErrorMessage = " Idno Should be maximum of 11 characters")]
        public string Idno { get; set; }
        public int? TelHome { get; set; }
        public int? TelMobile { get; set; }
        public int? TelOffice { get; set; }

        [StringLength(255, ErrorMessage = " Address Should be maximum of 255 characters")]
        public string Address { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set; }

        [StringLength(255, ErrorMessage = " Address Should be maximum of 255 characters")]
        public string WheelchairNo { get; set; }

        [StringLength(255, ErrorMessage = " Remarks Should be maximum of 255 characters")]
        public string Remarks { get; set; }

        [StringLength(100, ErrorMessage = " Witness Should be maximum of 100 characters")]
        public string Witness { get; set; }

        [StringLength(20, ErrorMessage = " Rank Should be maximum of 100 characters")]
        public string Rank { get; set; }
    }
}
