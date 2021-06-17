using System;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public class ErrorViewModel
    {
        [Required]
        [Key]
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
