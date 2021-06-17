using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class ExpenseTransaction
    {
        [Required]
        [Key]
        public int TransactionNo { get; set; }

        [StringLength(50, ErrorMessage = " Item Should be maximum of 50 characters")]
        public string Item { get; set; }

        [StringLength(50, ErrorMessage = " Item Should be maximum of 50 characters")]
        public string Type { get; set; }

        [StringLength(50, ErrorMessage = " Item Should be maximum of 50 characters")]
        public decimal UnitPrice { get; set; }
        public short Quantity { get; set; }
        public short Discount { get; set; }

        [StringLength(255, ErrorMessage = " Company Should be maximum of 255 characters")]
        public string Company { get; set; }

        [StringLength(50, ErrorMessage = " Quotation No Should be maximum of 50 characters")]
        public string QuotationNo { get; set; }
        public DateTime? QuotationDate { get; set; }
        public double? Cuhkpono { get; set; }
        public DateTime? Podate { get; set; }
        public DateTime? AcquisitionDate { get; set; }

        [StringLength(50, ErrorMessage = " Invoice No Should be maximum of 50 characters")]
        public string InvoiceNo { get; set; }
        public int? AssetNo { get; set; }
        public bool Settled { get; set; }
    }
}
