using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientVideoRecordsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public PatientVideoRecordsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/PatientVideoRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientVideoRecord>>> GetPatientVideoRecord()
        {
            return await _context.PatientVideoRecord.ToListAsync();
        }

        // GET: api/PatientVideoRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientVideoRecord>> GetPatientVideoRecord(int id)
        {
            var patientVideoRecord = await _context.PatientVideoRecord.FindAsync(id);

            if (patientVideoRecord == null)
            {
                return NotFound();
            }

            return patientVideoRecord;
        }

        // PUT: api/PatientVideoRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatientVideoRecord(int id, PatientVideoRecord patientVideoRecord)
        {
            if (id != patientVideoRecord.RefId)
            {
                return BadRequest();
            }

            _context.Entry(patientVideoRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientVideoRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PatientVideoRecords
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PatientVideoRecord>> PostPatientVideoRecord(PatientVideoRecord patientVideoRecord)
        {
            _context.PatientVideoRecord.Add(patientVideoRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatientVideoRecord", new { id = patientVideoRecord.RefId }, patientVideoRecord);
        }

        // DELETE: api/PatientVideoRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PatientVideoRecord>> DeletePatientVideoRecord(int id)
        {
            var patientVideoRecord = await _context.PatientVideoRecord.FindAsync(id);
            if (patientVideoRecord == null)
            {
                return NotFound();
            }

            _context.PatientVideoRecord.Remove(patientVideoRecord);
            await _context.SaveChangesAsync();

            return patientVideoRecord;
        }

        private bool PatientVideoRecordExists(int id)
        {
            return _context.PatientVideoRecord.Any(e => e.RefId == id);
        }
    }
}
