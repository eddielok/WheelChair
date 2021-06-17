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
    public class PhysicalExaminationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public PhysicalExaminationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/PhysicalExaminations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalExamination>>> GetPhysicalExamination()
        {
            return await _context.PhysicalExamination.ToListAsync();
        }

        // GET: api/PhysicalExaminations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhysicalExamination>> GetPhysicalExamination(int id)
        {
            var physicalExamination = await _context.PhysicalExamination.FindAsync(id);

            if (physicalExamination == null)
            {
                return NotFound();
            }

            return physicalExamination;
        }

        // PUT: api/PhysicalExaminations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhysicalExamination(int id, PhysicalExamination physicalExamination)
        {
            if (id != physicalExamination.RefId)
            {
                return BadRequest();
            }

            _context.Entry(physicalExamination).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhysicalExaminationExists(id))
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

        // POST: api/PhysicalExaminations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PhysicalExamination>> PostPhysicalExamination(PhysicalExamination physicalExamination)
        {
            _context.PhysicalExamination.Add(physicalExamination);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhysicalExamination", new { id = physicalExamination.RefId }, physicalExamination);
        }

        // DELETE: api/PhysicalExaminations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhysicalExamination>> DeletePhysicalExamination(int id)
        {
            var physicalExamination = await _context.PhysicalExamination.FindAsync(id);
            if (physicalExamination == null)
            {
                return NotFound();
            }

            _context.PhysicalExamination.Remove(physicalExamination);
            await _context.SaveChangesAsync();

            return physicalExamination;
        }

        private bool PhysicalExaminationExists(int id)
        {
            return _context.PhysicalExamination.Any(e => e.RefId == id);
        }
    }
}
