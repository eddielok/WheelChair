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
    public class SeatingSystemPrescriptionsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public SeatingSystemPrescriptionsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/SeatingSystemPrescriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeatingSystemPrescription>>> GetSeatingSystemPrescription()
        {
            return await _context.SeatingSystemPrescription.ToListAsync();
        }

        // GET: api/SeatingSystemPrescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SeatingSystemPrescription>> GetSeatingSystemPrescription(int id)
        {
            var seatingSystemPrescription = await _context.SeatingSystemPrescription.FindAsync(id);

            if (seatingSystemPrescription == null)
            {
                return NotFound();
            }

            return seatingSystemPrescription;
        }

        // PUT: api/SeatingSystemPrescriptions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeatingSystemPrescription(int id, SeatingSystemPrescription seatingSystemPrescription)
        {
            if (id != seatingSystemPrescription.RefId)
            {
                return BadRequest();
            }

            _context.Entry(seatingSystemPrescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatingSystemPrescriptionExists(id))
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

        // POST: api/SeatingSystemPrescriptions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SeatingSystemPrescription>> PostSeatingSystemPrescription(SeatingSystemPrescription seatingSystemPrescription)
        {
            _context.SeatingSystemPrescription.Add(seatingSystemPrescription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeatingSystemPrescription", new { id = seatingSystemPrescription.RefId }, seatingSystemPrescription);
        }

        // DELETE: api/SeatingSystemPrescriptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SeatingSystemPrescription>> DeleteSeatingSystemPrescription(int id)
        {
            var seatingSystemPrescription = await _context.SeatingSystemPrescription.FindAsync(id);
            if (seatingSystemPrescription == null)
            {
                return NotFound();
            }

            _context.SeatingSystemPrescription.Remove(seatingSystemPrescription);
            await _context.SaveChangesAsync();

            return seatingSystemPrescription;
        }

        private bool SeatingSystemPrescriptionExists(int id)
        {
            return _context.SeatingSystemPrescription.Any(e => e.RefId == id);
        }
    }
}
