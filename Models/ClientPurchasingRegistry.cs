using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class ClientPurchasingRegistry
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [Range(0, 9999999)]
        public int InvoiceNo { get; set; }
        public DateTime? Date { get; set; }

        [StringLength(255, ErrorMessage = " Name Should be maximum of 255 characters")]
        public string Name { get; set; }

        [RegularExpression(@"^[0-9]\d*(\.\d{2})?$", ErrorMessage = "Amount Should be allowed 2 digit number only")]
        public decimal Amount { get; set; }

        [StringLength(255, ErrorMessage = " Purchased Item Should be maximum of 255 characters")]
        public string PurchasedItem { get; set; }

        [StringLength(50, ErrorMessage = " PaymentType Should be maximum of 50 characters")]
        public string PaymentType { get; set; }
        public int? ChequeNo { get; set; }

        [StringLength(100, ErrorMessage = " BankCheque Should be maximum of 100 characters")]
        public string BankCheque { get; set; }

        [StringLength(50, ErrorMessage = " Staff Should be maximum of 50 characters")]
        public string Staff { get; set; }
    }
}
