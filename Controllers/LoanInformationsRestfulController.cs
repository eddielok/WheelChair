using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models; 
using Microsoft.AspNetCore.Authorization;
namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class LoanInformationsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public LoanInformationsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var loanInformations = _context.LoanInformation.ToListAsync();
            //return JsonConvert.SerializeObject(loanInformations.Result);

            return Ok(JsonConvert.SerializeObject(loanInformations.Result));

        }

        [HttpGet("{loanFormNo}")]
        public IActionResult Get(string loanFormNo)
        {
            var loanInformations = _context.LoanInformation.FirstOrDefault(x => x.LoanFormNo == loanFormNo);
            //return JsonConvert.SerializeObject(loanInformations.Result);

            return Ok(JsonConvert.SerializeObject(loanInformations));

        } 
        [HttpGet("seatNoRoute", Name = "LoanInformationnGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery]string seat_no)
        {//, [FromQuery]string? loanNum
            var multipleLoanInformation = await _context.LoanInformation.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.LoanDate)
                                                              .AsNoTracking()
                                                              .ToListAsync();

            return Ok(JsonConvert.SerializeObject(multipleLoanInformation));
        } 

        [HttpPost]
        public async Task<IActionResult> Post(LoanInformation loanInformation)
        { 
            string latestLoanFormNo = await GetLastFormNumber();
            loanInformation.LoanFormNo = latestLoanFormNo;

            _context.Add(loanInformation);
            var action = _context.SaveChangesAsync(); 
            //_context.SaveChanges();
            string location = "../LoanInformations/" + loanInformation.LoanFormNo;

            await action;

            return Created(location, loanInformation);
        }
         
        private async Task<string> GetLastFormNumber() //FIX By Ath
        {
            var loanFormNoList = await _context.LoanInformation.AsNoTracking() 
                                             .Select(x => x.LoanFormNo)
                                             .OrderByDescending(x => x)
                                             .ToListAsync();

            //assume the loan form No is prefixed with "CP" and followed by integer
            int latestLoanFormNo = loanFormNoList.Select(loanNo => int.Parse(loanNo.Substring(2, loanNo.Length-2)))
                                                  .OrderByDescending(x => x)
                                                  .FirstOrDefault();
            string prefix = "CP"; 
            return prefix + (latestLoanFormNo + 1).ToString().PadLeft(4, '0') ;  
        }

        [HttpPut]
        public IActionResult Put(LoanInformation loanInformation)
        {

            try
            {
                _context.Update(loanInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanInformationExists(loanInformation.LoanFormNo))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{loanFormNo}")]
        public IActionResult Delete(string loanFormNo)
        {

            var loanInformation = _context.LoanInformation.Find(loanFormNo);
            _context.LoanInformation.Remove(loanInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool LoanInformationExists(string id)
        {
            return _context.LoanInformation.Any(e => e.LoanFormNo == id);
        }
    }
}