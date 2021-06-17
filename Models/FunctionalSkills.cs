using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class FunctionalSkills
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 255 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(50, ErrorMessage = " Dressing Should be maximum of 255 characters")]
        public string Dressing { get; set; }

        [StringLength(50, ErrorMessage = " Feeding Should be maximum of 255 characters")]
        public string Feeding { get; set; }

        [StringLength(50, ErrorMessage = " Feeding Position Should be maximum of 255 characters")]
        public string FeedingPosition { get; set; }
        public float? FeedingTime { get; set; }

        [StringLength(50, ErrorMessage = " Aspiration Frequency Should be maximum of 255 characters")]
        public string AspirationFrequency { get; set; }

        [StringLength(50, ErrorMessage = " Vomitting Frequency Should be maximum of 255 characters")]
        public string VomittingFrequency { get; set; }


        [StringLength(50, ErrorMessage = " Toiletting Should be maximum of 255 characters")]
        public string Toiletting { get; set; }

        [StringLength(50, ErrorMessage = " Bathing Should be maximum of 255 characters")]
        public string Bathing { get; set; }
        public bool Splints { get; set; }
        public bool BathCommodeChair { get; set; }
        public bool CommunicationAids { get; set; }
        public bool Switches { get; set; }
        public bool ComputerAids { get; set; }
        public bool EnvironmentalControls { get; set; }

        [StringLength(255, ErrorMessage = " Other Atds Should be maximum of 255 characters")]
        public string OtherAtds { get; set; }

        [StringLength(50, ErrorMessage = " Mobility Skills Should be maximum of 50 characters")]
        public string MobilitySkills { get; set; }

        [StringLength(50, ErrorMessage = " Stand Skills Should be maximum of 50 characters")]
        public string Stand { get; set; }
        public float? StandDuration { get; set; }
        public float? StandFrequency { get; set; }

        [StringLength(50, ErrorMessage = " Transfer Should be maximum of 50 characters")]
        public string Transfer { get; set; }

        [StringLength(50, ErrorMessage = " Walking Ads Should be maximum of 50 characters")]
        public string WalkingAds { get; set; }

        [StringLength(50, ErrorMessage = " Walking Frame Should be maximum of 50 characters")]
        public string WalkingFrame { get; set; }

        [StringLength(50, ErrorMessage = " Current Seat Home Should be maximum of 50 characters")]
        public string CurrentSeatHome { get; set; }

        [StringLength(50, ErrorMessage = " Current Seat Transport Home Should be maximum of 50 characters")]
        public string CurrentSeatTransport { get; set; }
        public int? TotalTimeUsed { get; set; }

        [StringLength(50, ErrorMessage = " Use Frequency Should be maximum of 50 characters")]
        public string UseFrequency { get; set; }

        [StringLength(50, ErrorMessage = " Weight Shift Should be maximum of 50 characters")]
        public string WeightShift { get; set; }

        [StringLength(50, ErrorMessage = " Self Propel Should be maximum of 50 characters")]
        public string SelfPropel { get; set; }

        [StringLength(50, ErrorMessage = " Surfaces Should be maximum of 50 characters")]
        public string Surfaces { get; set; }

        [StringLength(50, ErrorMessage = " Wctransport Should be maximum of 50 characters")]
        public string Wctransport { get; set; }

        [StringLength(50, ErrorMessage = " WctransportBy Should be maximum of 50 characters")]
        public string WctransportBy { get; set; }

        [StringLength(50, ErrorMessage = " Accessibility Problems Should be maximum of 50 characters")]
        public string AccessibilityProblems { get; set; }

        [StringLength(50, ErrorMessage = " Notes Should be maximum of 50 characters")]
        public string Notes { get; set; }
    }
}
