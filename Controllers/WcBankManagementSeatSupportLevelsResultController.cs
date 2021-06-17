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
    public class WcBankManagementSeatSupportLevelsResultController : Controller
    {
        private readonly WheelChairContext _context;


        public WcBankManagementSeatSupportLevelsResultController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var wcBankManagementSeatSupportLevel = _context.WcBankManagementSeatSupportLevel.ToListAsync();
            //return JsonConvert.SerializeObject(WcBankManagementSeatSupports.Result);

            return Ok(JsonConvert.SerializeObject(wcBankManagementSeatSupportLevel.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var wcBankManagementSeatSupportLevel = _context.WcBankManagementSeatSupportLevel.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(WcBankManagementSeatSupports.Result);

            return Ok(JsonConvert.SerializeObject(wcBankManagementSeatSupportLevel));

        }



        [HttpPost]
        public IActionResult Post(WcBankManagementSeatSupportLevel WcBankManagementSeatSupport)
        {

            //var latestRefId = _context.WcBankManagementSeatSupportLevel.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //WcBankManagementSeatSupport.RefId = latestRefId + 1;

            WcBankManagementSeatSupport.RefId = 0;

            _context.Add(WcBankManagementSeatSupport);
            _context.SaveChanges();

            var location = "../WcBankManagementSeatSupportLevels/" + WcBankManagementSeatSupport.RefId;

            return Created(location, WcBankManagementSeatSupport);
        }

        [HttpPut]
        public IActionResult Put(WcBankManagementSeatSupportLevel wcBankManagementSeatSupportLevel)
        {

            try
            {
                _context.Update(wcBankManagementSeatSupportLevel);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WcBankManagementSeatSupportExists(wcBankManagementSeatSupportLevel.RefId))
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

            var WcBankManagementSeatSupport = _context.WcBankManagementSeatSupportLevel.Find(refId);
            _context.WcBankManagementSeatSupportLevel.Remove(WcBankManagementSeatSupport);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool WcBankManagementSeatSupportExists(int id)
        {
            return _context.WcBankManagementSeatSupportLevel.Any(e => e.RefId == id);
        }
    }
}