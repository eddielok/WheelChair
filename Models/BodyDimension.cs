using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class BodyDimension
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [Required(ErrorMessage = "Seat No {0} is required")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Seat No Should be minimum 1 characters and a maximum of 50 characters")]
        [DataType(DataType.Text)]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Height, allow 2 decimal point only")]
        public float? Height { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Weight, allow 2 decimal point only")] 
        public float? Weight { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Pelvic Width, allow 2 decimal point only")] 
        public float? PelvicWidth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Pelvic Wbrace, allow 2 decimal point only")] 
        public float? PelvicWbrace { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Chest Width, allow 2 decimal point only")]
        public float? ChestWidth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Chest W brace, allow 2 decimal point only")] 
        public float? ChestWbrace { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Shoulder Width, allow 2 decimal point only")] 
        public float? ShoulderWidth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Head Width, allow 2 decimal point only")] 
        public float? HeadWidth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Knee Width, allow 2 decimal point only")] 
        public float? KneeWidth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Left Seat Depth, allow 2 decimal point only")] 
        public float? LseatDepth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Right Seat Depth, allow 2 decimal point only")] 
        public float? RseatDepth { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Occipution, allow 2 decimal point only")] 
        public float? SeatToOcciput { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Obrace, allow 2 decimal point only")] 
        public float? SeatToObrace { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Shoulder, allow 2 decimal point only")] 
        public float? SeatToShoulder { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Sbrace, allow 2 decimal point only")] 
        public float? SeatToSbrace { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Axilla, allow 2 decimal point only")] 
        public float? SeatToAxilla { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Seat To Psis, allow 2 decimal point only")] 
        public float? SeatToPsis { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Back To Ant Of IT, allow 2 decimal point only")] 
        public float? BackToAntOfIt { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Left leg Length, allow 2 decimal point only")] 
        public float? LlegLength { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Right leg Length, allow 2 decimal point only")] 
        public float? RlegLength { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Left foot Length, allow 2 decimal point only")] 
        public float? LfootLength { get; set; }

        [RegularExpression(@"^\d*(\.\d{1,2})?$", ErrorMessage = "Invalid Right foot Length, allow 2 decimal point only")] 
        public float? RfootLength { get; set; }
    }
}
