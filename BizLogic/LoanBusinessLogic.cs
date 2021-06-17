//20200905 refactored by Ath, to enforce class responsibility; enforce DB modication via Restful API
//20200919 code review - roll down to use foreach to eliminate meaningless LINQ read
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using WheelChair.Controllers;
using WheelChair.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace WheelChair.BusinessLogic {
    public class LoanBusinessLogic : Controller {
        public async Task<IActionResult> HandleUpdateLoan(LoanSubmit loanRequest, WheelChairContext context) {
            try {
                if (loanRequest.LoanedArticles != null && loanRequest.LoanedArticles.Length > 0) {
                    //roll down to use foreach to eliminate meaningless LINQ read
                    var articlesObj = new LoanedArticlesRestfulController(context);
                    bool isCreateItemNeeded = false;
                    foreach (LoanedArticle laItem in loanRequest.LoanedArticles) {
                        switch (laItem.ArticleAction) {
                            case 0:
                                articlesObj.Delete(laItem.RefId);
                                ReturnAPart(laItem, context);
                                break;
                            case 1:
                                if (!isCreateItemNeeded) isCreateItemNeeded = true;
                                break;
                            case 2:
                                articlesObj.Put(laItem);
                                break;
                        }
                    }
                    if (isCreateItemNeeded) {
                        var createList = loanRequest.LoanedArticles.Where(anloanArti => anloanArti.ArticleAction == 1);
                        foreach (LoanedArticle laItem in createList) {
                            laItem.LoanFormNo = loanRequest.Loan.LoanFormNo;
                            BorrowAPart(laItem, context);
                        }
                        _ = await articlesObj.PostList(createList.ToArray());
                    }
                }
                //handle wheelchair return  
                LoanInformation original_LoanInfo = context.LoanInformation.AsNoTracking().FirstOrDefault(li => li.LoanFormNo == loanRequest.Loan.LoanFormNo);
                if (original_LoanInfo != null) {
                    // if new != old WC no, needs update availability
                    if (!string.Equals(loanRequest.Loan.WheelchairNo, original_LoanInfo.WheelchairNo)) {
                        ReturnWheelchair(original_LoanInfo, context);
                        // for return the wheelchair only; otherwise, needs to mark original WC available, new input unavailable
                        if (!string.IsNullOrEmpty(loanRequest.Loan.WheelchairNo.Trim()) && !string.Equals(loanRequest.Loan.WheelchairNo, "N/A"))
                            BorrowWheelchair(loanRequest.Loan, context);
                    }
                }
                IActionResult result = new LoanInformationsRestfulController(context).Put(loanRequest.Loan);
                return Accepted(loanRequest);
            }
            catch (System.Exception) {
                throw;
            }
        }
        public async Task<IActionResult> HandleCreateLoan(LoanSubmit loanRequest, WheelChairContext context) {
            var result2 = await new LoanInformationsRestfulController(context).Post(loanRequest.Loan);

            CreatedResult c_result = result2 as CreatedResult;

            if (c_result.StatusCode != 201) return this.StatusCode(500, c_result.Value);
            LoanInformation createdLoanInfo = c_result.Value as LoanInformation;

            if (loanRequest.LoanedArticles != null && loanRequest.LoanedArticles.Length > 0) {
                //update loan articles with created loan form no
                string t = createdLoanInfo.LoanFormNo;
                foreach (LoanedArticle LAitem in loanRequest.LoanedArticles) {
                    LAitem.LoanFormNo = t;
                    BorrowAPart(LAitem, context);
                }
                //create loan articles
                _ = await new LoanedArticlesRestfulController(context).PostList(loanRequest.LoanedArticles);
            }
            if (!string.IsNullOrEmpty(loanRequest.Loan.WheelchairNo.Trim()) && !string.Equals(loanRequest.Loan.WheelchairNo, "N/A"))
                BorrowWheelchair(loanRequest.Loan, context);
            string location = "../LoanInformations/" + createdLoanInfo.LoanFormNo;
            return Created(location, loanRequest);
        }
        #region "loan helper" 
        private void BorrowWheelchair(LoanInformation loan, WheelChairContext context) {
            try {
                JsonPatchDocument<WheelchairInformation> patchDoc = new JsonPatchDocument<WheelchairInformation>() { };
                patchDoc.Replace(wc => wc.Availability, false);
                var result = new WheelchairInformationsRestfulController(context).Patch(loan.WheelchairNo, patchDoc);
            }
            catch (System.Exception) {
                throw;
            }
        }
        private void ReturnWheelchair(LoanInformation loan, WheelChairContext context) {
            try {
                if (!string.IsNullOrEmpty(loan.WheelchairNo.Trim())) {
                    JsonPatchDocument<WheelchairInformation> patchDoc = new JsonPatchDocument<WheelchairInformation>() { };
                    patchDoc.Replace(wc => wc.Availability, true);
                    var result = new WheelchairInformationsRestfulController(context).Patch(loan.WheelchairNo, patchDoc);
                }
            }
            catch (System.Exception) {
                throw;
            }
        }
        private void BorrowAPart(LoanedArticle loanedArticle, WheelChairContext context) {
            try {
                PartsInformation ori_out = context.PartsInformation.AsNoTracking().FirstOrDefault(la => la.PartNo == loanedArticle.PartNo);
                JsonPatchDocument<PartsInformation> patchDoc = new JsonPatchDocument<PartsInformation>() { };
                patchDoc.Replace(wc => wc.OutQuantity, ori_out.OutQuantity + 1);
                var result = new PartsInformationsRestfulController(context).Patch(loanedArticle.PartNo, patchDoc);
            }
            catch (System.Exception) {
                throw;
            }
        }
        private void ReturnAPart(LoanedArticle loanedArticle, WheelChairContext context) {
            try {
                PartsInformation ori_out = context.PartsInformation.AsNoTracking().FirstOrDefault(la => la.PartNo == loanedArticle.PartNo);
                JsonPatchDocument<PartsInformation> patchDoc = new JsonPatchDocument<PartsInformation>() { };
                patchDoc.Replace(wc => wc.OutQuantity, ori_out.OutQuantity - 1);
                var result = new PartsInformationsRestfulController(context).Patch(loanedArticle.PartNo, patchDoc);
            }
            catch (System.Exception) {
                throw;
            }
        }
        #endregion  

    }
}