﻿using System;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public class Account
    {
        [Required]
        [Key]
        public Int64? Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}