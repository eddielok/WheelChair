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
    public class PpmisRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public PpmisRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var ppmis = _context.Ppmi.ToListAsync();
            //return JsonConvert.SerializeObject(ppmis.Result);

            return Ok(JsonConvert.SerializeObject(ppmis.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var ppmis = _context.Ppmi.FirstOrDefault(x => x.PpmiRegNo == refId);
            //return JsonConvert.SerializeObject(ppmis.Result);

            return Ok(JsonConvert.SerializeObject(ppmis));

        }
        [HttpGet("seatNoRoute", Name = "PPMIsGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery]string seat_no)
        {
            var workOrder = await _context.Ppmi.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.Date)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(workOrder));
        }

        [HttpPost]
        public IActionResult Post(Ppmi ppmi)
        {

            //var latestPpmiRegNo = _context.Ppmi.OrderByDescending(x => x.PpmiRegNo).FirstOrDefault().PpmiRegNo;
            //ppmi.PpmiRegNo = latestPpmiRegNo + 1;

            ppmi.PpmiRegNo = 0;

            _context.Add(ppmi);
            _context.SaveChanges();

            var location = "../Ppmiss/" + ppmi.PpmiRegNo;

            return Created(location, ppmi);
        }

        [HttpPut]
        public IActionResult Put(Ppmi ppmi)
        {

            try
            {
                _context.Update(ppmi);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PpmisExists(ppmi.PpmiRegNo))
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

            var ppmi = _context.Ppmi.Find(refId);
            _context.Ppmi.Remove(ppmi);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool PpmisExists(int id)
        {
            return _context.Ppmi.Any(e => e.PpmiRegNo == id);
        }
    }
}