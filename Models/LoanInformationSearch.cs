using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class LoanInformationSearch
    {
        [Required]
        [Key]
        public string LoanFormNo { get; set; }
        public string SeatNo { get; set; }
        public string WheelchairNo { get; set; }
   
    }
}
