using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class PhysicalExamination
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(50, ErrorMessage = " SkinCondition Should be maximum of 50 characters")]
        public string SkinCondition { get; set; }
        public bool PressureMap { get; set; }

        [StringLength(50, ErrorMessage = " MatHeadPosition Should be maximum of 50 characters")]
        public string MatHeadPosition { get; set; }

        [StringLength(50, ErrorMessage = " MatHeadRot Should be maximum of 50 characters")]
        public string MatHeadRot { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicAntTilt Should be maximum of 50 characters")]
        public string MatPelvicAntTilt { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicAntTiltRange Should be maximum of 50 characters")]
        public string MatPelvicAntTiltRange { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicPostTilt Should be maximum of 50 characters")]
        public string MatPelvicPostTilt { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicPostTiltRange Should be maximum of 50 characters")]
        public string MatPelvicPostTiltRange { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicSideFlexL Should be maximum of 50 characters")]
        public string MatPelvicSideFlexL { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicSideFlexRangeL Should be maximum of 50 characters")]
        public string MatPelvicSideFlexRangeL { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicSideFlexR Should be maximum of 50 characters")]
        public string MatPelvicSideFlexR { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicSideFlexRangeR Should be maximum of 50 characters")]
        public string MatPelvicSideFlexRangeR { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicRotL Should be maximum of 50 characters")]
        public string MatPelvicRotL { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicRotRangeL Should be maximum of 50 characters")]
        public string MatPelvicRotRangeL { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicRotR Should be maximum of 50 characters")]
        public string MatPelvicRotR { get; set; }

        [StringLength(50, ErrorMessage = " MatPelvicRotRangeR Should be maximum of 50 characters")]
        public string MatPelvicRotRangeR { get; set; }

        [StringLength(50, ErrorMessage = " MatHipFlex Should be maximum of 50 characters")]
        public string MatHipFlex { get; set; }

        [StringLength(50, ErrorMessage = " MatHipContracture Should be maximum of 50 characters")]
        public string MatHipContracture { get; set; }

        [StringLength(50, ErrorMessage = " MatHipContracture Should be maximum of 50 characters")]
        public string MatHipAbdAdd { get; set; }

        [StringLength(50, ErrorMessage = " MatHipRotate Should be maximum of 50 characters")]
        public string MatHipRotate { get; set; }

        [StringLength(50, ErrorMessage = " MatHipIntegrity Should be maximum of 50 characters")]
        public string MatHipIntegrity { get; set; }

        [StringLength(50, ErrorMessage = " MatKneePopliteal Should be maximum of 50 characters")]
        public string MatKneePopliteal { get; set; }

        [StringLength(50, ErrorMessage = " MatKneeContracture Should be maximum of 50 characters")]
        public string MatKneeContracture { get; set; }

        [StringLength(50, ErrorMessage = " MatAnkle Should be maximum of 50 characters")]
        public string MatAnkle { get; set; }

        [StringLength(50, ErrorMessage = " MatSpine Should be maximum of 50 characters")]
        public string MatSpine { get; set; }

        [StringLength(50, ErrorMessage = " MatSpinePri Should be maximum of 50 characters")]
        public string MatSpinePri { get; set; }

        [StringLength(50, ErrorMessage = " MatSpineSec Should be maximum of 50 characters")]
        public string MatSpineSec { get; set; }

        [StringLength(100, ErrorMessage = " SittingBalance Should be maximum of 100 characters")]
        public string SittingBalance { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadControl Should be maximum of 50 characters")]
        public string SitHeadControl { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadFlex Should be maximum of 50 characters")]
        public string SitHeadFlex { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadPreferToTurn Should be maximum of 50 characters")]
        public string SitHeadPreferToTurn { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadDrop Should be maximum of 50 characters")]
        public string SitHeadDrop { get; set; }

        [StringLength(50, ErrorMessage = " SitSpine Should be maximum of 50 characters")]
        public string SitSpine { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadTilt Should be maximum of 50 characters")]
        public string SitHeadTilt { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadTiltSeverity Should be maximum of 50 characters")]
        public string SitHeadTiltSeverity { get; set; }

        [StringLength(50, ErrorMessage = " SitHeadTiltFlexibility Should be maximum of 50 characters")]
        public string SitHeadTiltFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitThoracicConvexity Should be maximum of 50 characters")]
        public string SitThoracicConvexity { get; set; }

        [StringLength(50, ErrorMessage = " SitThoracicSeverity Should be maximum of 50 characters")]
        public string SitThoracicSeverity { get; set; }

        [StringLength(50, ErrorMessage = " SitThoracicFlexibility Should be maximum of 50 characters")]
        public string SitThoracicFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitLumbarConvexity Should be maximum of 50 characters")]
        public string SitLumbarConvexity { get; set; }

        [StringLength(50, ErrorMessage = " SitLumbarSeverity Should be maximum of 50 characters")]
        public string SitLumbarSeverity { get; set; }

        [StringLength(50, ErrorMessage = " SitLumbarFlexibility Should be maximum of 50 characters")]
        public string SitLumbarFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitRibHump Should be maximum of 50 characters")]
        public string SitRibHump { get; set; }

        [StringLength(50, ErrorMessage = " SitHumpLevel Should be maximum of 50 characters")]
        public string SitHumpLevel { get; set; }

        [StringLength(50, ErrorMessage = " SitKyphosis Should be maximum of 50 characters")]
        public string SitKyphosis { get; set; }

        [StringLength(50, ErrorMessage = " SitKyphoticFlexibility Should be maximum of 50 characters")]
        public string SitKyphoticFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitLordosis Should be maximum of 50 characters")]
        public string SitLordosis { get; set; }

        [StringLength(50, ErrorMessage = " SitLordoticFlexibility Should be maximum of 50 characters")]
        public string SitLordoticFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitSpineRotation Should be maximum of 50 characters")]
        public string SitSpineRotation { get; set; }

        [StringLength(50, ErrorMessage = " SitLumbarFlexion Should be maximum of 50 characters")]
        public string SitLumbarFlexion { get; set; }

        [StringLength(50, ErrorMessage = " SitLumbarExtension Should be maximum of 50 characters")]
        public string SitLumbarExtension { get; set; }

        [StringLength(50, ErrorMessage = " SitPelvicFlexibility Should be maximum of 50 characters")]
        public string SitPelvicFlexibility { get; set; }

        [StringLength(50, ErrorMessage = " SitPelvicFlexibilityTilt Should be maximum of 50 characters")]
        public string SitPelvicFlexibilityTilt { get; set; }

        [StringLength(50, ErrorMessage = " SitPelvicTilt Should be maximum of 50 characters")]
        public string SitPelvicTilt { get; set; }

        [StringLength(50, ErrorMessage = " SitPelvicObliquity Should be maximum of 50 characters")]
        public string SitPelvicObliquity { get; set; }

        [StringLength(50, ErrorMessage = " SitPelvicRotation Should be maximum of 50 characters")]
        public string SitPelvicRotation { get; set; }

        [StringLength(50, ErrorMessage = " SitThighsWindswept Should be maximum of 50 characters")]
        public string SitThighsWindswept { get; set; }

        [StringLength(50, ErrorMessage = " SitThighsAdducted Should be maximum of 50 characters")]
        public string SitThighsAdducted { get; set; }

        [StringLength(50, ErrorMessage = " Tone Should be maximum of 50 characters")]
        public string Tone { get; set; }

        [StringLength(100, ErrorMessage = " Reflexes Should be maximum of 100 characters")]
        public string Reflexes { get; set; }

        [StringLength(100, ErrorMessage = " Movement Should be maximum of 100 characters")]
        public string Movement { get; set; }

        [StringLength(100, ErrorMessage = " Llstrength Should be maximum of 100 characters")]
        public string Llstrength { get; set; }

        [StringLength(100, ErrorMessage = " Ulstrength Should be maximum of 100 characters")]
        public string Ulstrength { get; set; }

        [StringLength(100, ErrorMessage = " HandFunction Should be maximum of 100 characters")]
        public string HandFunction { get; set; }

        [StringLength(100, ErrorMessage = " Ulfunction Should be maximum of 100 characters")]
        public string Ulfunction { get; set; }

        [StringLength(100, ErrorMessage = " Notes Should be maximum of 100 characters")]
        public string Notes { get; set; }
    }
}
