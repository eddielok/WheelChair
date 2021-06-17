using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class WheelchairSpecification
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " WheelchairModel Should be maximum of 255 characters")]
        public string WheelchairModel { get; set; }

        [StringLength(255, ErrorMessage = " WheelchairManufacturer Should be maximum of 255 characters")]
        public string WheelchairManufacturer { get; set; }

        [StringLength(255, ErrorMessage = " Description Should be maximum of 500 characters")]
        public string Description { get; set; }
        public bool Power { get; set; }
        public bool TiltInSpace { get; set; }
        public bool Foldable { get; set; }

        [StringLength(255, ErrorMessage = " WcPicLink Should be maximum of 255 characters")]
        public string WcPicLink { get; set; }

        [StringLength(255, ErrorMessage = " CatalogLink Should be maximum of 255 characters")]
        public string CatalogLink { get; set; }
        public decimal? CurPrice { get; set; }
    }
}
