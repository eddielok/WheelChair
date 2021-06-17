using System.ComponentModel.DataAnnotations;

namespace WheelChair.Models
{
    public partial class LoanSubmit {
        [Required]
        public LoanInformation Loan { get; set; }
        public LoanedArticle[] LoanedArticles { get; set; }
       
    }
}
