using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class PpmiItems
    {
        [Required]
        [Key]
        public int RefId { get; set; }
        public int? PpmiRegNo { get; set; }

        [StringLength(155, ErrorMessage = " Item Should be maximum of 155 characters")]
        public string Item { get; set; }

        [StringLength(100, ErrorMessage = " Specification Should be maximum of 100 characters")]
        public string Specification { get; set; }

        [StringLength(255, ErrorMessage = " Supplier Should be maximum of 255 characters")]
        public string Supplier { get; set; }

        [StringLength(50, ErrorMessage = " QuotationNo Should be maximum of 50 characters")]
        public string QuotationNo { get; set; }
        public int? Quantity { get; set; }
        public decimal? Amount { get; set; }
        public bool PatientSelected { get; set; }
    }
}
