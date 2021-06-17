using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models; 
using Microsoft.AspNetCore.Authorization;
namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class CondemnRecordsRestfulController : Controller
    {
        private readonly WheelChairContext _context;

        public CondemnRecordsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/CondemnRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CondemnRecords>>> GetCondemnRecords()
        {
            return await _context.CondemnRecords.ToListAsync();
        }

        // GET: api/CondemnRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CondemnRecords>> GetCondemnRecords(string id)
        {
            var condemnRecord = await _context.CondemnRecords.FindAsync(id);

            if (condemnRecord == null)
            {
                return NotFound();
            }

            return condemnRecord;
        }

        // PUT: api/CondemnRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCondemnRecords(int id, CondemnRecords condemnRecord)
        {
            if (id != condemnRecord.RefId)
            {
                return BadRequest();
            }

            _context.Entry(condemnRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CondemnRecordsExists(id))
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

        // POST: api/CondemnRecords
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CondemnRecords>> PostCondemnRecords(CondemnRecords condemnRecord)
        {

            condemnRecord.RefId = 0;

            _context.CondemnRecords.Add(condemnRecord);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CondemnRecordsExists(condemnRecord.RefId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCondemnRecords", new { id = condemnRecord.RefId }, condemnRecord);
        }

        // DELETE: api/CondemnRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CondemnRecords>> DeleteCondemnRecords(int id)
        {
            var condemnRecord = await _context.CondemnRecords.FindAsync(id);
            if (condemnRecord == null)
            {
                return NotFound();
            }

            _context.CondemnRecords.Remove(condemnRecord);
            await _context.SaveChangesAsync();

            return condemnRecord;
        }

        private bool CondemnRecordsExists(int id)
        {
            return _context.CondemnRecords.Any(e => e.RefId == id);
        }
    }

}