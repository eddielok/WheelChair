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
    public class PatientVideoRecordsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public PatientVideoRecordsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var patientVideoRecords = _context.PatientVideoRecord.ToListAsync();
            //return JsonConvert.SerializeObject(patientVideoRecords.Result);

            return Ok(JsonConvert.SerializeObject(patientVideoRecords.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var patientVideoRecords = _context.PatientVideoRecord.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(patientVideoRecords.Result);

            return Ok(JsonConvert.SerializeObject(patientVideoRecords));

        }



        [HttpPost]
        public IActionResult Post(PatientVideoRecord patientVideoRecord)
        {

            // var latestRefId = _context.PatientVideoRecord.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            // patientVideoRecord.RefId = latestRefId + 1;

            patientVideoRecord.RefId = 0;

            _context.Add(patientVideoRecord);
            _context.SaveChanges();

            var location = "../PatientVideoRecords/" + patientVideoRecord.RefId;

            return Created(location, patientVideoRecord);
        }

        [HttpPut]
        public IActionResult Put(PatientVideoRecord patientVideoRecord)
        {

            try
            {
                _context.Update(patientVideoRecord);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientVideoRecordExists(patientVideoRecord.RefId))
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

            var patientVideoRecord = _context.PatientVideoRecord.Find(refId);
            _context.PatientVideoRecord.Remove(patientVideoRecord);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool PatientVideoRecordExists(int id)
        {
            return _context.PatientVideoRecord.Any(e => e.RefId == id);
        }

    }
}