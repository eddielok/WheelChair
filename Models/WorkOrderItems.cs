using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WorkOrderItems
    {
        [Required]
        [Key]
        public int RefId { get; set; }
        public int OrderNo { get; set; }
        public DateTime OrderDate { get; set; }

        [StringLength(255, ErrorMessage = " Item Should be maximum of 255 characters")]
        public string Item { get; set; }
        public bool Completed { get; set; }

        [StringLength(50, ErrorMessage = " Item Should be maximum of 50 characters")]
        public string Staff { get; set; }
        public DateTime? CompletionDate { get; set; }
    }
}
