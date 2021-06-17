using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WheelChair.Models {
    public partial class Supplier {
        [Required]
        [Key]
        public int RefId { get; set; }
        [Required]
        public string Supplier1 { get; set; }

        [StringLength(255, MinimumLength = 3, ErrorMessage = " Contact Person Should be minimum 3 characters and a maximum of 255 characters")]
        public string Last { get; set; }

        [Range(10000000, 999999999)]
        public int? TelWork { get; set; }

        [Range(10000000, 999999999)]
        public int? TelOffice { get; set; }

        [Range(10000000, 999999999)]
        public int? Fax { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [StringLength(255, MinimumLength = 0, ErrorMessage = " Contact Person Should be maximum of 255 characters")]
        public string Address { get; set; }
    }
    //public partial class Supplier
    //{
    //    [Required]
    //    [Key]
    //    public int RefId { get; set; }

    //    [Required(ErrorMessage = "Employee {0} is required")]
    //    [StringLength(255, MinimumLength = 3, ErrorMessage = "Supplier Should be minimum 3 characters and a maximum of 255 characters")]
    //    [DataType(DataType.Text)]
    //    public string Supplier1 { get; set; }

    //    [Required(ErrorMessage = " Contact Person {0} is required")]
    //    [StringLength(255, MinimumLength = 3, ErrorMessage = " Contact Person Should be minimum 3 characters and a maximum of 255 characters")]
    //    [DataType(DataType.Text)]
    //    public string Last { get; set; }

    //    [Range(10000000, 9999999999)]
    //    public int? TelWork { get; set; }

    //    [Range(10000000, 9999999999)]
    //    public int? TelOffice { get; set; }


    //    //public double? Fax { get; set; }
    //    [Range(10000000, 9999999999)]
    //    public int? Fax { get; set; }

    //    [Required]
    //    [DataType(DataType.EmailAddress)]
    //    [EmailAddress]
    //    public string Email { get; set; }

    //    [Required(ErrorMessage = " Address {0} is required")]
    //    [StringLength(255, MinimumLength = 0, ErrorMessage = " Contact Person Should be maximum of 255 characters")]
    //    public string Address { get; set; }
    //}
}
