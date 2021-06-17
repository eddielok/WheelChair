using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class OrthoSpinalAssessment
    {
        [Required]
        [Key]
        public int RefId { get; set; }
        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }

        public DateTime? Date { get; set; }

        [StringLength(255, ErrorMessage = " Assessment Should be maximum of 255 characters")]
        public string Assessment { get; set; }

        [StringLength(50, ErrorMessage = " Sla1 Should be maximum of 50 characters")]
        public string Sla1 { get; set; }

        [StringLength(50, ErrorMessage = " Sla2 Should be maximum of 50 characters")]
        public string Sla2 { get; set; }

        [StringLength(50, ErrorMessage = " Sla3 Should be maximum of 50 characters")]
        public string Sla3 { get; set; }

        [StringLength(50, ErrorMessage = " Sla3 Should be maximum of 50 characters")]
        public string Risser { get; set; }

        [StringLength(50, ErrorMessage = " Sla3 Should be maximum of 50 characters")]
        public string Menarche { get; set; }

        [StringLength(50, ErrorMessage = " Thoracic Should be maximum of 50 characters")]
        public string Thoracic { get; set; }

        [StringLength(50, ErrorMessage = " Lumbar Should be maximum of 50 characters")]
        public string Lumbar { get; set; }

        [StringLength(50, ErrorMessage = " Spa Should be maximum of 50 characters")]
        public string Spa { get; set; }

        [StringLength(50, ErrorMessage = " RPfa Should be maximum of 50 characters")]
        public string RPfa { get; set; }

        [StringLength(50, ErrorMessage = " LPfa Should be maximum of 50 characters")]
        public string LPfa { get; set; }
    }
}
