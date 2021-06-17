using WheelChair.Models;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic; 
using Microsoft.EntityFrameworkCore;

namespace WheelChair.Controllers {
    internal class LoanRequestValidator  {
        public static IEnumerable<ValidationResult> ValidateLoanRequestBase(LoanSubmit loanRequest, WheelChairContext context) {
            string loanArticlesAvai = LoanArticlesValidator.CheckLoanArticlesAvailability(loanRequest.LoanedArticles, context);
            if (!string.IsNullOrWhiteSpace(loanArticlesAvai))
                yield return new ValidationResult($"  {loanArticlesAvai }", new[] { "LoanArticlesAvailability" });

            if (string.IsNullOrWhiteSpace(loanRequest.Loan.PatientName))
                yield return new ValidationResult($" Patient name should not be empty", new[] { "PatientName" });

        } 
        private static bool IsDifferentWC(string ori_wc, string  new_wc) {
            if (ori_wc == null && new_wc == null) return false;
            else if (ori_wc != null && new_wc == null) return true;
            else if (ori_wc == null && new_wc != null && !string.Equals(new_wc, "N/A")) return true;
            else return ori_wc.ToLower() != new_wc.ToLower() && !string.Equals(new_wc, "N/A");
        }
        public static IEnumerable<ValidationResult> ValidateUpdateLoanRequest(LoanSubmit loanRequest, WheelChairContext context) {
            bool isReturnedinDB = false;  
            LoanInformation LoanInfo = context.LoanInformation.AsNoTracking().FirstOrDefault(li => li.LoanFormNo == loanRequest.Loan.LoanFormNo);
            if (LoanInfo == null)
                yield return new ValidationResult($"Loan not found", new[] { "LoanFormNo" });
            else
                isReturnedinDB = LoanInfo.ReturnDate != null ? true : false;
             
            //already return but still want to add items or loan WC - not permit
            if (loanRequest.Loan.ReturnDate != null || isReturnedinDB) {
                bool isAddingArticles = false;
                if (loanRequest.LoanedArticles != null ) isAddingArticles = loanRequest.LoanedArticles.FirstOrDefault(ar => ar.RefId == 0) == null ? false : true;
                
                bool isChangingDifferent_WC = false;
                if (LoanInfo != null) isChangingDifferent_WC = IsDifferentWC(LoanInfo.WheelchairNo,loanRequest.Loan.WheelchairNo);
                if (LoanInfo != null && LoanInfo.ReturnDate != null && (isAddingArticles || isChangingDifferent_WC))
                    yield return new ValidationResult($"Loan already returned but try to add items or loan WC", new[] { "Loan" });
                else if (loanRequest.Loan.ReturnDate != null && (isAddingArticles || isChangingDifferent_WC))
                    yield return new ValidationResult($"try to add new item(s)/ change wheelchair to a returning loan", new[] { "Loan" });
            }

            if (!string.IsNullOrWhiteSpace(loanRequest.Loan.WheelchairNo)) {
                WheelchairInformation selectedWheelchair = context.WheelchairInformation.AsNoTracking().FirstOrDefault(wc => wc.WheelchairNo == loanRequest.Loan.WheelchairNo);
                if (selectedWheelchair == null)
                    yield return new ValidationResult($"No wheelchair found", new[] { "WheelchairAvailability" });
                else { 
                    // if try to change wheelchair then its availability needs to be true
                    if (LoanInfo.WheelchairNo != selectedWheelchair.WheelchairNo && !string.Equals(selectedWheelchair.WheelchairNo, "N/A") && !selectedWheelchair.Availability) {
                        yield return new ValidationResult($"Wheelchair not available", new[] { "WheelchairAvailability" });
                    }
                }
            }
             if (loanRequest.LoanedArticles != null  && loanRequest.LoanedArticles.FirstOrDefault(a => a.RefId != 0 && a.LoanFormNo != loanRequest.Loan.LoanFormNo) != null)
                 yield return new ValidationResult($" at least one loan article does not belong to the loan instance", new[] { "LoanFormNo" });

        }

    } 
}