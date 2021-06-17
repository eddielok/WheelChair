using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;

namespace WheelChair.wwwroot
{
    [Route("api/[controller]")]
    [ApiController]
    public class PpmisController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public PpmisController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/Ppmis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ppmi>>> GetPpmi()
        {
            return await _context.Ppmi.ToListAsync();
        }

        // GET: api/Ppmis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ppmi>> GetPpmi(int id)
        {
            var ppmi = await _context.Ppmi.FindAsync(id);

            if (ppmi == null)
            {
                return NotFound();
            }

            return ppmi;
        }

        // PUT: api/Ppmis/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPpmi(int id, Ppmi ppmi)
        {
            if (id != ppmi.PpmiRegNo)
            {
                return BadRequest();
            }

            _context.Entry(ppmi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PpmiExists(id))
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

        // POST: api/Ppmis
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ppmi>> PostPpmi(Ppmi ppmi)
        {
            _context.Ppmi.Add(ppmi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPpmi", new { id = ppmi.PpmiRegNo }, ppmi);
        }

        // DELETE: api/Ppmis/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ppmi>> DeletePpmi(int id)
        {
            var ppmi = await _context.Ppmi.FindAsync(id);
            if (ppmi == null)
            {
                return NotFound();
            }

            _context.Ppmi.Remove(ppmi);
            await _context.SaveChangesAsync();

            return ppmi;
        }

        private bool PpmiExists(int id)
        {
            return _context.Ppmi.Any(e => e.PpmiRegNo == id);
        }
    }
}
