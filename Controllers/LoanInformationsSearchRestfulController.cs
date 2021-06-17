using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanInformationsSearchRestfulController : Controller
    {

        private readonly WheelChairContext _context;
        public LoanInformationsSearchRestfulController(WheelChairContext context)
        {
            _context = context;
        }


        [HttpPost]
        public IActionResult Post(LoanInformationSearch loanInformationSearch)
        {
            //var ClientInformations = _context.ClientInformation.FirstOrDefault(x => x.SeatNo == seatNo);
            //return JsonConvert.SerializeObject(ClientInformations.Result);
            var ClientInformations = _context.LoanInformation.Where(x => 1 == 1);

            if (!string.IsNullOrEmpty(loanInformationSearch.LoanFormNo ))
                ClientInformations = ClientInformations.Where(x => x.LoanFormNo.Contains(loanInformationSearch.LoanFormNo));

            if (!string.IsNullOrEmpty(loanInformationSearch.SeatNo))
                ClientInformations = ClientInformations.Where(x => x.SeatNo.Contains(loanInformationSearch.SeatNo));

            if (!string.IsNullOrEmpty(loanInformationSearch.WheelchairNo ))
                ClientInformations = ClientInformations.Where(x => x.WheelchairNo.Contains(loanInformationSearch.WheelchairNo));

            return Ok(JsonConvert.SerializeObject(ClientInformations.ToList()));

            //            {
            //                "SeatNo": null,
            //  "Hkid": null,
            //  "LastName": "TULS",
            //  "FirstName": null,
            //  "ChineseName": null
            //}

        }


    }
}