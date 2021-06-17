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
    public class FundingInformationsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public FundingInformationsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var fundingInformations = _context.FundingInformation.ToListAsync();
            //return JsonConvert.SerializeObject(fundingInformations.Result);

            return Ok(JsonConvert.SerializeObject(fundingInformations.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var fundingInformations= _context.FundingInformation.FirstOrDefault(x => x.RefId == refId) ;
            //return JsonConvert.SerializeObject(fundingInformations.Result);

            return Ok(JsonConvert.SerializeObject(fundingInformations));

        }



        [HttpPost]
        public IActionResult Post(FundingInformation fundingInformation)
        {

            //var latestRefId = _context.FundingInformation.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //fundingInformation.RefId = latestRefId + 1;
            fundingInformation.RefId = 0;

            _context.Add(fundingInformation);
            _context.SaveChanges();

            var location = "../FundingInformations/" + fundingInformation.RefId;

            return Created(location, fundingInformation);
        }

        [HttpPut]
        public IActionResult Put(FundingInformation fundingInformation)
        {

            try
            {
                _context.Update(fundingInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FundingInformationExists(fundingInformation.RefId))
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

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId)
        {

            var fundingInformation = _context.FundingInformation.Find(refId);
            _context.FundingInformation.Remove(fundingInformation);
            _context.SaveChanges();
            
            return this.StatusCode(204); 
        }


        private bool FundingInformationExists(int id)
        {
            return _context.FundingInformation.Any(e => e.RefId == id);
        }
    }
}