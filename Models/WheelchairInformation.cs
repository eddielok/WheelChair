using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WheelChair.Models
{
    public partial class WheelchairInformation
    {
        [Required]
        [Key]
        [StringLength(6, ErrorMessage = " Wheelchair  Should be maximum of 6 characters")]
        public string WheelchairNo { get; set; }

        [StringLength(255, ErrorMessage = " WheelchairModel Should be maximum of 255 characters")]
        public string WheelchairModel { get; set; }
        public bool Availability { get; set; }

        [StringLength(50, ErrorMessage = " Status Should be maximum of 50 characters")]
        public string Status { get; set; }

        [StringLength(50, ErrorMessage = " Supplier Should be maximum of 50 characters")]
        public string Supplier { get; set; }

        [StringLength(12, ErrorMessage = " Color Should be maximum of 12 characters")]
        public string Color { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Panda Size, allow 2 decimal point only")]
        public float? PandaSize { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat Width, allow 2 decimal point only")]
        public double? SeatWidth { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat Depth, allow 2 decimal point only")]
        public double? SeatDepth { get; set; }
        public bool Recliner { get; set; }
        public bool ElevatingFr { get; set; }

        [StringLength(3, ErrorMessage = " RearWheelSize Should be maximum of 3 characters")]
        public string RearWheelSize { get; set; } 
        public decimal? Price { get; set; }
        public DateTime? AcqusitionDate { get; set; }
        public int? Inventory { get; set; }

        [StringLength(255, ErrorMessage = " FundedBy Should be maximum of 255 characters")]
        public string FundedBy { get; set; }
        public bool LabelPrinted { get; set; }
        public DateTime? CondemnDate { get; set; }
         
    }
}
