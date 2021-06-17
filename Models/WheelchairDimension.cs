using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WheelchairDimension
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " PaymentType Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime? Date { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Panda Size, allow 2 decimal point only")]
        public float? PandaSize { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Back Height, allow 2 decimal point only")]
        public float? BackHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid WC Seat Width, allow 2 decimal point only")]
        public float? WcseatWidth { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid WC Seat Width, allow 2 decimal point only")]
        public float? WclseatDepth { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid WC Seat Width, allow 2 decimal point only")]
        public float? WcrseatDepth { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "[OBSo] Invalid WC Seat Height, allow 2 decimal point only")]
        public float? WcseatHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Back Angle, allow 2 decimal point only")]
        public float? SeatToBackAngle { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid System Tilt Angle, allow 2 decimal point only")]
        public float? SystemTiltAngle { get; set; } 
        public int? LlateralSupportHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid R Lateral Support Height, allow 2 decimal point only")]
        public float? RlateralSupportHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid L Arm Rest Height, allow 2 decimal point only")]
        public float? LarmrestHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid R Arm Rest Height, allow 2 decimal point only")]
        public float? RarmrestHeight { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid L Seat To Leg Rest Angle, allow 2 decimal point only")]
        public float? LseatToLegrestAngle { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid R Seat To Leg Rest Angle, allow 2 decimal point only")]
        public float? RseatToLegrestAngle { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid L Leg Rest Foot Rest Angle, allow 2 decimal point only")]
        public float? LlegrestFootrestAngle { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid R Leg Rest Foot Rest Angle, allow 2 decimal point only")]
        public float? RlegrestFootrestAngle { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid L Leg Rest Length, allow 2 decimal point only")]
        public float? LlegrestLength { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid R Leg Rest Length, allow 2 decimal point only")]
        public float? RlegrestLength { get; set; }
        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Drop Raise Seat Height, allow 2 decimal point only")]
        public float? DropRaiseSeatHeight { get; set; }
    }
}
