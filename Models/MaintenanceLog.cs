using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class MaintenanceLog
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " Item No Should be maximum of 255 characters")]
        public string ItemNo { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
        public DateTime? Date { get; set; }

        [StringLength(255, ErrorMessage = " Problems Should be maximum of 255 characters")]
        public string Problems { get; set; }

        [StringLength(255, ErrorMessage = " Maintenance Procedures Should be maximum of 255 characters")]
        public string MaintenanceProcedures { get; set; }
        public DateTime? CompletionDate { get; set; }

        [StringLength(255, ErrorMessage = " Staff Should be maximum of 255 characters")]
        public string Staff { get; set; }
    }
}
