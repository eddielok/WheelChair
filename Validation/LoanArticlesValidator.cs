using WheelChair.Models;
using System.Linq; 
using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;

namespace WheelChair.Controllers {
    static internal class LoanArticlesValidator {
        private static readonly string msg_1 = " has no stock or not found";
        public static string CheckLoanArticlesAvailability(LoanedArticle[] loanArticles, WheelChairContext context) {
            if (loanArticles == null ||  loanArticles.Length <= 0) return "";
            List<string> notAvailableParts = new List<string> { };
            //if needs to borrow, need to chk 'eir availability
            foreach (var aPart in loanArticles.Where(x=>x.ArticleAction==1).GroupBy(x => x.PartNo)) {
                PartsInformation aPartInformation = context.PartsInformation.AsNoTracking().FirstOrDefault(a => a.PartNo.ToLower() == aPart.Key.ToLower());
                if (aPartInformation == null) {
                    notAvailableParts.Add(aPart.Key);
                }
                else {
                    if (aPartInformation.TotalQuantity - aPartInformation.OutQuantity <= 0)
                        notAvailableParts.Add(aPart.Key);
                    else if ((aPartInformation.TotalQuantity - aPartInformation.OutQuantity - aPart.Count()) <0)  
                        notAvailableParts.Add(aPart.Key); 
                }
            }
            if (notAvailableParts.Count > 0)
                return String.Join(",", notAvailableParts) + msg_1;
            else
                return "";
        }
    }
}