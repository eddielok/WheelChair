using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models {
    public partial class ClientInformation : IValidatableObject {
        [Required]
        [Key]
        public string SeatNo { get; set; }

        [StringLength(12, MinimumLength = 1, ErrorMessage = " HKID Should be minimum 3 characters and a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string Hkid { get; set; }

        [StringLength(255, MinimumLength = 1, ErrorMessage = " Last Name Should be minimum 1 characters and a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }


        [StringLength(255, MinimumLength = 1, ErrorMessage = " First Name Should be minimum 1 characters and a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }


        [StringLength(50, ErrorMessage = " Chinese Name Should be minimum 1 characters and a maximum of 255 characters")]
        [DataType(DataType.Text)]
        public string ChineseName { get; set; }

        [RegularExpression(@"[MF ]{1,1}", ErrorMessage ="Sex Should be 1 characters(M / F) or empty")] 
        [DataType(DataType.Text)]
        public string Sex { get; set; }
        public short? Age1stAtt { get; set; }
        public DateTime Dob { get; set; }

        [RegularExpression(@"^[0-9]\d*(\.\d{15})?$", ErrorMessage = "Tel - Home Should not be more than 15 integer")]
        public int? TelHome { get; set; }

        [RegularExpression(@"^[0-9]\d*(\.\d{15})?$", ErrorMessage = "Tel - Day Should not be more than 15 integer")]
        public int? TelDay { get; set; }

        [StringLength(155, ErrorMessage = " Address Should be maximum of 155 characters")]
        public string Address { get; set; }

        [StringLength(50, ErrorMessage = " District Should be maximum of 50 characters")]
        public string District { get; set; }

        [StringLength(50, ErrorMessage = " Region Should be maximum of 50 characters")]
        public string Region { get; set; }
        public DateTime? _1stDate { get; set; }

        [StringLength(255, ErrorMessage = " Diagnosis Should be maximum of 255 characters")]
        public string Diagnosis { get; set; }

        [StringLength(255, ErrorMessage = " Complications Should be maximum of 255 characters")]
        public string Complications { get; set; }

        [StringLength(255, ErrorMessage = " MedicalHx Should be maximum of 255 characters")]
        public string MedicalHx { get; set; }

        [StringLength(255, ErrorMessage = " Reason Should be maximum of 255 characters")]
        public string Reason { get; set; }
        public bool Alive { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {
            string msg_1 = "needs to be"; 
            if (Age1stAtt < 0) {
                yield return new ValidationResult(
                    $"{nameof(Age1stAtt)} {msg_1} larger than zero.",
                    new[] { nameof(Age1stAtt) });
            } 
        }
    }
}
