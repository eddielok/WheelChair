//20200905 refactored by Ath, to enforce class responsibility; enforce DB modication via Restful API

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using WheelChair.Models;
using WheelChair.BusinessLogic;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class LoanSubmitRestfulController : Controller {
        private readonly WheelChairContext _context;

        public LoanSubmitRestfulController(WheelChairContext context) {
            _context = context;
        } 
        [HttpPut]
        public async Task<IActionResult> GetUpdateLoanResult(LoanSubmit loanRequest, [FromQuery] bool isValidate) {
            if (isValidate) {
                IEnumerable<ValidationResult> result_p1 = LoanRequestValidator.ValidateUpdateLoanRequest(loanRequest, _context);
                IEnumerable<ValidationResult> result_p2 = LoanRequestValidator.ValidateLoanRequestBase(loanRequest, _context);
                if (result_p1.GetEnumerator().MoveNext() || result_p2.GetEnumerator().MoveNext())
                    return new UnprocessableEntityObjectResult($"{{\"Loan base\": { JsonConvert.SerializeObject(result_p2)},\"update part\": { JsonConvert.SerializeObject(result_p1)} }}");
            }
            LoanBusinessLogic processor = new LoanBusinessLogic() { };
            return await processor.HandleUpdateLoan(loanRequest,_context); 
        } 
        [HttpPost]
        public async Task<IActionResult> GetCreateLoanResult(LoanSubmit loanRequest, [FromQuery] bool isValidate) {
            if (isValidate) {
                IEnumerable<ValidationResult> result = LoanRequestValidator.ValidateLoanRequestBase(loanRequest, _context);
                if (result.GetEnumerator().MoveNext()) return await Task.Run(() => this.StatusCode(422, $"{{\"Loan base\": { JsonConvert.SerializeObject(result)}  }}"));
            }
            LoanBusinessLogic processor = new LoanBusinessLogic() { };
            return await processor.HandleCreateLoan(loanRequest, _context);

        }
    }
}