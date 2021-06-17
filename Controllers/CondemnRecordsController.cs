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
    public class CondemnRecordsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public CondemnRecordsController(WheelChairContext context)
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
        public async Task<ActionResult<CondemnRecords>> GetCondemnRecords(int id)
        {
            var condemnRecords = await _context.CondemnRecords.FindAsync(id);

            if (condemnRecords == null)
            {
                return NotFound();
            }

            return condemnRecords;
        }

        // PUT: api/CondemnRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCondemnRecords(int id, CondemnRecords condemnRecords)
        {
            if (id != condemnRecords.RefId)
            {
                return BadRequest();
            }

            _context.Entry(condemnRecords).State = EntityState.Modified;

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
        public async Task<ActionResult<CondemnRecords>> PostCondemnRecords(CondemnRecords condemnRecords)
        {
            _context.CondemnRecords.Add(condemnRecords);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCondemnRecords", new { id = condemnRecords.RefId }, condemnRecords);
        }

        // DELETE: api/CondemnRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CondemnRecords>> DeleteCondemnRecords(int id)
        {
            var condemnRecords = await _context.CondemnRecords.FindAsync(id);
            if (condemnRecords == null)
            {
                return NotFound();
            }

            _context.CondemnRecords.Remove(condemnRecords);
            await _context.SaveChangesAsync();

            return condemnRecords;
        }

        private bool CondemnRecordsExists(int id)
        {
            return _context.CondemnRecords.Any(e => e.RefId == id);
        }
    }
}
