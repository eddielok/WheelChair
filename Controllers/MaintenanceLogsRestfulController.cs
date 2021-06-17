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
    public class MaintenanceLogsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public MaintenanceLogsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var maintenanceLogs = _context.MaintenanceLog.ToListAsync();
            //return JsonConvert.SerializeObject(maintenanceLogs.Result);

            return Ok(JsonConvert.SerializeObject(maintenanceLogs.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var maintenanceLogs = _context.MaintenanceLog.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(maintenanceLogs.Result);

            return Ok(JsonConvert.SerializeObject(maintenanceLogs));

        }
        [HttpGet("filterByStrRoute", Name = "MaintenanceLogFilterByStr")] //By Ath
        public async Task<IActionResult> GetList([FromQuery]string filterStr) {
            var maintenanceLogs = await _context.MaintenanceLog.Where(x => x.Problems.Contains(filterStr))
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(maintenanceLogs));
        }


        [HttpPost]
        public IActionResult Post(MaintenanceLog maintenanceLog)
        {

            //var latestRefId = _context.MaintenanceLog.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //maintenanceLog.RefId = latestRefId + 1;

            maintenanceLog.RefId = 0;

            _context.Add(maintenanceLog);
            _context.SaveChanges();

            var location = "../MaintenanceLogs/" + maintenanceLog.RefId;

            return Created(location, maintenanceLog);
        }

        [HttpPut]
        public IActionResult Put(MaintenanceLog maintenanceLog)
        {

            try
            {
                _context.Update(maintenanceLog);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaintenanceLogExists(maintenanceLog.RefId))
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

            var maintenanceLog = _context.MaintenanceLog.Find(refId);
            _context.MaintenanceLog.Remove(maintenanceLog);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool MaintenanceLogExists(int id)
        {
            return _context.MaintenanceLog.Any(e => e.RefId == id);
        }
    }
}