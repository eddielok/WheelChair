using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class MedicalInformation
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }

        [StringLength(255, ErrorMessage = " SurgeryInfo Should be maximum of 255 characters")]
        public string SurgeryInfo { get; set; }

        [StringLength(255, ErrorMessage = " PendingSurgery Should be maximum of 255 characters")]
        public string PendingSurgery { get; set; }

        [StringLength(255, ErrorMessage = " Seizures Should be maximum of 255 characters")]
        public string Seizures { get; set; }

        [StringLength(255, ErrorMessage = " PressureSores Should be maximum of 255 characters")]
        public string PressureSores { get; set; }

        [StringLength(255, ErrorMessage = " ExistingSores Should be maximum of 255 characters")]
        public string ExistingSores { get; set; }

        [StringLength(255, ErrorMessage = " PainDiscomfort Should be maximum of 255 characters")]
        public string PainDiscomfort { get; set; }

        [StringLength(255, ErrorMessage = " Sensation Should be maximum of 255 characters")]
        public string Sensation { get; set; }

        [StringLength(255, ErrorMessage = " Hearing Should be maximum of 255 characters")]
        public string Hearing { get; set; }

        [StringLength(255, ErrorMessage = " Vision Should be maximum of 255 characters")]
        public string Vision { get; set; }

        [StringLength(255, ErrorMessage = " RespiratoryStatus Should be maximum of 255 characters")]
        public string RespiratoryStatus { get; set; }

        [StringLength(255, ErrorMessage = " Notes Should be maximum of 255 characters")]
        public string Notes { get; set; }
    }
}
