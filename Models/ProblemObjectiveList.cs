using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class ProblemObjectiveList
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }  
        public bool Deformity1 { get; set; }
        public bool Deformity2 { get; set; }
        public bool Deformity3 { get; set; }

        [StringLength(255, ErrorMessage = " Deformity4 Should be maximum of 255 characters")]
        public string Deformity4 { get; set; }

        [StringLength(255, ErrorMessage = " Deformity5 Should be maximum of 255 characters")]
        public string Deformity5 { get; set; }
        public bool PressureArea1 { get; set; }
        public bool PressureArea2 { get; set; }

        [StringLength(255, ErrorMessage = " PressureArea3 Should be maximum of 255 characters")]
        public string PressureArea3 { get; set; }

        [StringLength(255, ErrorMessage = " PressureArea4 Should be maximum of 255 characters")]
        public string PressureArea4 { get; set; }
        public bool SitPosture1 { get; set; }
        public bool SitPosture2 { get; set; }

        [StringLength(255, ErrorMessage = " SitPosture3 Should be maximum of 255 characters")]
        public string SitPosture3 { get; set; }

        [StringLength(255, ErrorMessage = " SitPosture4 Should be maximum of 255 characters")]
        public string SitPosture4 { get; set; }
        public bool SitTolerance1 { get; set; }
        public bool SitTolerance2 { get; set; }
        public bool SitTolerance3 { get; set; }

        [StringLength(255, ErrorMessage = " SitTolerance4 Should be maximum of 255 characters")]
        public string SitTolerance4 { get; set; }

        [StringLength(255, ErrorMessage = " SitTolerance5 Should be maximum of 255 characters")]
        public string SitTolerance5 { get; set; }
        public bool Ambulation1 { get; set; }
        public bool Ambulation2 { get; set; }
        public bool Ambulation3 { get; set; }
        public bool Ambulation4 { get; set; }

        [StringLength(255, ErrorMessage = " Ambulation5 Should be maximum of 255 characters")]
        public string Ambulation5 { get; set; }

        [StringLength(255, ErrorMessage = " Ambulation6 Should be maximum of 255 characters")]
        public string Ambulation6 { get; set; }
        public bool Ulfunction1 { get; set; }
        public bool Ulfunction2 { get; set; }
        public bool Ulfunction3 { get; set; }

        [StringLength(255, ErrorMessage = " Ulfunction4 Should be maximum of 255 characters")]
        public string Ulfunction4 { get; set; }

        [StringLength(255, ErrorMessage = " Ulfunction5 Should be maximum of 255 characters")]
        public string Ulfunction5 { get; set; }
        public bool FunctionalSkills1 { get; set; }
        public bool FunctionalSkills2 { get; set; }
        public bool FunctionalSkills3 { get; set; }
        public bool FunctionalSkills4 { get; set; }

        [StringLength(255, ErrorMessage = " FunctionalSkills5 Should be maximum of 255 characters")]
        public string FunctionalSkills5 { get; set; }

        [StringLength(255, ErrorMessage = " FunctionalSkills6 Should be maximum of 255 characters")]
        public string FunctionalSkills6 { get; set; }
        public string Notes { get; set; }
    }
}
