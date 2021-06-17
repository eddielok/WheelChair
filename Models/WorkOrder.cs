using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WorkOrder
    {
        public int? OrderNo { get; set; }
        public DateTime OrderDate { get; set; }

        [StringLength(50, ErrorMessage = " SeatNo Should be maximum of 50 characters")]
        public string SeatNo { get; set; }
    }
}
