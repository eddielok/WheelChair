using System; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WheelChair.Models
{
    public partial class LoanedArticle
    {
        [Required]
        [Key]
        public int RefId { get; set; }

        [StringLength(6, ErrorMessage = " Loan Form No Should be maximum of 6 characters")]
        public string LoanFormNo { get; set; }

        [StringLength(50, ErrorMessage = " Part No Should be maximum of 6 characters")]
        public string PartNo { get; set; }

        [StringLength(255, ErrorMessage = " Remarks Should be maximum of 6 characters")]
        public string Remarks { get; set; }
        public bool Broken { get; set; }
        public DateTime? DateBroken { get; set; }
        public bool Paid { get; set; }

        [NotMapped]
        public int? ArticleAction { get; set; }
         //0:delete; 1:create; 2:update
    }
}
