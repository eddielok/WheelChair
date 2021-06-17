using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models; 
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class ClientInformationsSearchRestfulController : Controller
    {

        private readonly WheelChairContext _context;
        public ClientInformationsSearchRestfulController(WheelChairContext context)
        {
            _context = context;
        }
        [HttpPost("SearchClientByClient", Name = "ClientInformationsSearchRestful_SeachClientByClient")] //By Ath
      
        public async Task<ActionResult<IEnumerable<ClientInformation>>> Post_SeachClientByClient(ClientInformationSearch clientInformationSearch)
        {  
            var clientInformations = await  _context.ClientInformation.AsNoTracking()
                 .WhereIf(x => x.Hkid.Contains(clientInformationSearch.Hkid), !string.IsNullOrEmpty(clientInformationSearch.Hkid))
                 .WhereIf(x => x.SeatNo.Contains(clientInformationSearch.SeatNo), !string.IsNullOrEmpty(clientInformationSearch.SeatNo))
                 .WhereIf(x => x.ChineseName.Contains(clientInformationSearch.ChineseName), !string.IsNullOrEmpty(clientInformationSearch.ChineseName))
                 .WhereIf(x => x.LastName.Contains(clientInformationSearch.LastName), !string.IsNullOrEmpty(clientInformationSearch.LastName))
                 .WhereIf(x => x.FirstName.Contains(clientInformationSearch.FirstName), !string.IsNullOrEmpty(clientInformationSearch.FirstName))
                 .ToListAsync();
            return   Ok(JsonConvert.SerializeObject(clientInformations));
        }
        [HttpPost("SearchLoan", Name = "ClientInformationsSearchRestful_SeachLoan")] //By Ath
        public async Task<ActionResult<IEnumerable<LoanInformation>>> Post_SeachLoan(ClientInformationSearch clientInformationSearch) {

            var clientLoan = await _context.LoanInformation.AsNoTracking()
                 .WhereIf(x => x.LoanFormNo.Contains(clientInformationSearch.LoanNo), !string.IsNullOrEmpty(clientInformationSearch.LoanNo))
                 .WhereIf(x => x.LoanFormNo.Contains(clientInformationSearch.SeatNo), !string.IsNullOrEmpty(clientInformationSearch.SeatNo))
                 .WhereIf(x => x.WheelchairNo.Contains(clientInformationSearch.LoanWheelChairNo), !string.IsNullOrEmpty(clientInformationSearch.LoanWheelChairNo))
                 .ToListAsync();
 
            return Ok(JsonConvert.SerializeObject(clientLoan));
        }
        //[HttpPost("SearchClientByLoan", Name = "ClientInformationsSearchRestful_SeachClientByLoan")] //By Ath
        //public async Task<ActionResult<IEnumerable<ClientInformation>>> Post_SeachClientByLoan(ClientInformationSearch clientInformationSearch) {
        //      
        //    var clientLoan = _context.LoanInformation.AsNoTracking()
        //         .WhereIf(x => x.LoanFormNo.Contains(clientInformationSearch.LoanNo), !string.IsNullOrEmpty(clientInformationSearch.LoanNo))
        //         .WhereIf(x => x.WheelchairNo.Contains(clientInformationSearch.LoanWheelChairNo), !string.IsNullOrEmpty(clientInformationSearch.LoanWheelChairNo))
        //         .ToListAsync();
        //
        //    List<LoanInformation> clientLoan_result = await clientLoan;
        //    List<ClientInformation> clientInfo_result_loan = new List<ClientInformation>() { };
        //
        //    if (clientLoan_result.Count > 0) {
        //        List<string> loan_client_list = clientLoan_result.Select(loanInfo => loanInfo.SeatNo).ToList();
        //        foreach (string seatNo in loan_client_list) {
        //          //  yield return 
        //            clientInfo_result_loan.Add(_context.ClientInformation.AsNoTracking()
        //                                            .Where(cInfo => cInfo.SeatNo == seatNo)
        //                                            .FirstOrDefault());
        //        }
        //    }
        //    return Ok(JsonConvert.SerializeObject(clientInfo_result_loan));
        //}

        [HttpPost("SearchWheelChair", Name = "ClientInformationsSearchRestful_SeachWheelChair")] //By Ath
        public async Task<ActionResult<IEnumerable<WheelchairInformation>>> Post_SeachWheelChair(ClientInformationSearch clientInformationSearch) {
            // Search from  1)  wheelchair info then use  2) wheelchair spec to filter selected

            var wheelchairInfoList_raw =  _context.WheelchairInformation.AsNoTracking()
                    .WhereIf(x => x.ElevatingFr == true, clientInformationSearch.IsElevateFootrest != null && clientInformationSearch.IsElevateFootrest == true)
                    .WhereIf(x => x.Recliner == true, clientInformationSearch.IsRecliner != null && clientInformationSearch.IsRecliner == true)
                    .WhereIf(x => x.RearWheelSize != null && string.Equals(x.RearWheelSize,"L")  , clientInformationSearch.IsRearWheel_L != null && clientInformationSearch.IsRearWheel_L == true)
                    .WhereIf(x => x.RearWheelSize != null && string.Equals(x.RearWheelSize, "S"), clientInformationSearch.IsRearWheel_S != null && clientInformationSearch.IsRearWheel_S == true)
                    .WhereIf(x => x.SeatDepth >= clientInformationSearch.WheelchairDepth_base && x.SeatDepth <= clientInformationSearch.WheelchairDepth_upper, clientInformationSearch.WheelchairDepth_base != null)
                    .WhereIf(x => x.SeatWidth >= clientInformationSearch.WheelchairWidth_base  && x.SeatDepth <= clientInformationSearch.WheelchairWidth_upper, clientInformationSearch.WheelchairWidth_base != null)              
                    .WhereIf(x => x.PandaSize >= clientInformationSearch.PandaSize_base && x.PandaSize <= clientInformationSearch.WheelchairPandaSize_upper, clientInformationSearch.PandaSize_base != null)              
                    .WhereIf(x =>  x.Availability == true  , clientInformationSearch.IsShowAll == false)
                    .WhereIf(x => (x.Availability == true || x.Availability == false), clientInformationSearch.IsShowAll == true)
                    .ToListAsync();
            //filter existing wheelchair list, get the WC if on the list 
            List<WheelchairInformation> wheelchairInfoList = await wheelchairInfoList_raw; 
            if (clientInformationSearch.IsFilterWCResultBySpec == true) { 
                foreach (WheelchairInformation aWC in wheelchairInfoList.Reverse<WheelchairInformation>()) {
                    WheelchairSpecification tmp = _context.WheelchairSpecification.AsNoTracking().Where(aSpec => string.Equals(aSpec.WheelchairModel, aWC.WheelchairModel))
                       .WhereIf(x => x.TiltInSpace == true, clientInformationSearch.IsTilt != null && clientInformationSearch.IsTilt == true)
                      .WhereIf(x => x.Power == true, clientInformationSearch.IsPower != null && clientInformationSearch.IsPower == true)
                      .WhereIf(x => x.Foldable == true, clientInformationSearch.IsFoldable != null && clientInformationSearch.IsFoldable == true).FirstOrDefault();
                    if (tmp == null) wheelchairInfoList.Remove(aWC);
                }
            }
            // is depth and width is a range???
            return Ok(JsonConvert.SerializeObject(wheelchairInfoList));
        }

        [HttpPost("SearchWheelChairBySpec", Name = "ClientInformationsSearchRestful_SearchWheelChairBySpec")] //By Ath
        public async Task<ActionResult<IEnumerable<WheelchairInformation>>> Post_SearchWheelChairBySpec(ClientInformationSearch clientInformationSearch) {
            var wheelchairSpecList = await _context.WheelchairSpecification.AsNoTracking()
                   .WhereIf(x => x.TiltInSpace == true, clientInformationSearch.IsTilt != null && clientInformationSearch.IsTilt == true)
                   .WhereIf(x => x.Power == true, clientInformationSearch.IsPower != null && clientInformationSearch.IsPower == true)
                   .WhereIf(x => x.Foldable == true, clientInformationSearch.IsFoldable != null && clientInformationSearch.IsFoldable == true)
                    .ToListAsync(); 
            return Ok(JsonConvert.SerializeObject(wheelchairSpecList));
        }
    }
}
