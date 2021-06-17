using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class SeatingSystemPrescription
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(50, ErrorMessage = " ChairType Should be maximum of 50 characters")]
        public string ChairType { get; set; }

        [StringLength(50, ErrorMessage = " FrameType Should be maximum of 50 characters")]
        public string FrameType { get; set; }

        [StringLength(50, ErrorMessage = " SeatBase Should be maximum of 50 characters")]
        public string SeatBase { get; set; }

        [StringLength(50, ErrorMessage = " CushionType Should be maximum of 50 characters")]
        public string CushionType { get; set; }

        [StringLength(50, ErrorMessage = " CushionDensity Should be maximum of 50 characters")]
        public string CushionDensity { get; set; }

        [StringLength(50, ErrorMessage = " CushionModification Should be maximum of 50 characters")]
        public string CushionModification { get; set; }

        [StringLength(50, ErrorMessage = " CushionCover Should be maximum of 50 characters")]
        public string CushionCover { get; set; }

        [StringLength(50, ErrorMessage = " PelvicStablizer Should be maximum of 50 characters")]
        public string PelvicStablizer { get; set; }

        [StringLength(50, ErrorMessage = " PelvicSupport Should be maximum of 50 characters")]
        public string PelvicSupport { get; set; }

        [StringLength(50, ErrorMessage = " AdductorWedge Should be maximum of 50 characters")]
        public string AdductorWedge { get; set; }

        [StringLength(50, ErrorMessage = " AbductorWedge Should be maximum of 50 characters")]
        public string AbductorWedge { get; set; }

        [StringLength(50, ErrorMessage = " KneeSupport Should be maximum of 50 characters")]
        public string KneeSupport { get; set; }

        [StringLength(50, ErrorMessage = " BackrestType Should be maximum of 50 characters")]
        public string BackrestType { get; set; }

        [StringLength(50, ErrorMessage = " BackCushionType Should be maximum of 50 characters")]
        public string BackCushionType { get; set; }

        [StringLength(50, ErrorMessage = " BackCushionDensity Should be maximum of 50 characters")]
        public string BackCushionDensity { get; set; }

        [StringLength(50, ErrorMessage = " BackModification Should be maximum of 50 characters")]
        public string BackModification { get; set; }

        [StringLength(50, ErrorMessage = " SeatToBack Should be maximum of 50 characters")]
        public string SeatToBack { get; set; }

        [StringLength(50, ErrorMessage = " LateralSupport Should be maximum of 50 characters")]
        public string LateralSupport { get; set; }

        [StringLength(50, ErrorMessage = " SpinalBrace Should be maximum of 50 characters")]
        public string SpinalBrace { get; set; }

        [StringLength(50, ErrorMessage = " LumbarSupport Should be maximum of 50 characters")]
        public string LumbarSupport { get; set; }

        [StringLength(50, ErrorMessage = " ShoulderSupport Should be maximum of 50 characters")]
        public string ShoulderSupport { get; set; }

        [StringLength(50, ErrorMessage = " HeadSupport Should be maximum of 50 characters")]
        public string HeadSupport { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem1 Should be maximum of 50 characters")]
        public string SpecialItem1 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem2 Should be maximum of 50 characters")]
        public string SpecialItem2 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem3 Should be maximum of 50 characters")]
        public string SpecialItem3 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem4 Should be maximum of 50 characters")]
        public string SpecialItem4 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem5 Should be maximum of 50 characters")]
        public string SpecialItem5 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem6 Should be maximum of 50 characters")]
        public string SpecialItem6 { get; set; }

        [StringLength(50, ErrorMessage = " SpecialItem7 Should be maximum of 50 characters")]
        public string SpecialItem7 { get; set; }

        [StringLength(255, ErrorMessage = " Notes Should be maximum of 255 characters")]
        public string Notes { get; set; }

        [StringLength(50, ErrorMessage = " FullSystemChanges Should be maximum of 50 characters")]
        public string FullSystemChanges { get; set; }

        [StringLength(50, ErrorMessage = " PtPruchaseWc Should be maximum of 50 characters")]
        public string PtPruchaseWc { get; set; }

        [StringLength(50, ErrorMessage = " PtHaveWc Should be maximum of 50 characters")]
        public string PtHaveWc { get; set; }
    }
}
