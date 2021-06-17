using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class PartsInformation
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(255, ErrorMessage = " PartNo Should be maximum of 255 characters")]
        public string PartNo { get; set; }

        [StringLength(255, ErrorMessage = " Description Should be maximum of 255 characters")]
        public string Description { get; set; }

        [StringLength(255, ErrorMessage = " PartType Should be maximum of 255 characters")]
        public string PartType { get; set; }

        public bool Consumable { get; set; }

        [StringLength(255, ErrorMessage = " Manufacturer Should be maximum of 255 characters")]
        public string Manufacturer { get; set; }

        [StringLength(100, ErrorMessage = " Supplier Should be maximum of 100 characters")]
        public string Supplier { get; set; }
        public int TotalQuantity { get; set; }
        public int OutQuantity { get; set; }

        [StringLength(255, ErrorMessage = " PicLink Should be maximum of 100 characters")]
        public string PicLink { get; set; }
        public decimal? Price { get; set; }
    }
}
