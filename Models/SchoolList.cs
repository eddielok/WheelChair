using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class SchoolList
    {
        [Required]
        [Key]
        public int RefId { get; set; }


        [StringLength(255, ErrorMessage = " SchoolName Should be maximum of 255 characters")]
        public string SchoolName { get; set; }

        [StringLength(255, ErrorMessage = " Region Should be maximum of 255 characters")]
        public string Region { get; set; }

        [StringLength(255, ErrorMessage = " Address Should be maximum of 255 characters")]
        public string Address { get; set; }
        public int? Telephone { get; set; }
        public int? Fax { get; set; }
    }
}
