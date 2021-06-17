using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class ClientAttendance
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [Required(ErrorMessage = "SeatNo {0} is required")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Seat No Should be minimum 1 characters and a maximum of 50 characters")]
        [DataType(DataType.Text)]
        public string SeatNo { get; set; }
        public DateTime Date { get; set; }
        public bool Attendance { get; set; }

        [StringLength(50,   ErrorMessage = " Session should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Session { get; set; }

        [StringLength(255, ErrorMessage = " Remarks should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Remarks { get; set; }

        [StringLength(255,   ErrorMessage = " Picture should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Picture { get; set; }

        [StringLength(255,   ErrorMessage = " Video should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Video { get; set; }

        [StringLength(255,  ErrorMessage = " Xray should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Xray { get; set; }

        [StringLength(255,   ErrorMessage = " Pressure should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Pressure { get; set; }

        [StringLength(255,  ErrorMessage = " Progress should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Progress { get; set; }

        [StringLength(255,  ErrorMessage = " Mo Notes should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string MoNotes { get; set; }

        [StringLength(255,   ErrorMessage = " Seating Notes should only have a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string SeatingNotes { get; set; }
    }
}
