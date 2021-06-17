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
    public class OrthoSpinalAssessmentsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public OrthoSpinalAssessmentsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/OrthoSpinalAssessments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrthoSpinalAssessment>>> GetOrthoSpinalAssessment()
        {
            return await _context.OrthoSpinalAssessment.ToListAsync();
        }

        // GET: api/OrthoSpinalAssessments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrthoSpinalAssessment>> GetOrthoSpinalAssessment(int id)
        {
            var orthoSpinalAssessment = await _context.OrthoSpinalAssessment.FindAsync(id);

            if (orthoSpinalAssessment == null)
            {
                return NotFound();
            }

            return orthoSpinalAssessment;
        }

        // PUT: api/OrthoSpinalAssessments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrthoSpinalAssessment(int id, OrthoSpinalAssessment orthoSpinalAssessment)
        {
            if (id != orthoSpinalAssessment.RefId)
            {
                return BadRequest();
            }

            _context.Entry(orthoSpinalAssessment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrthoSpinalAssessmentExists(id))
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

        // POST: api/OrthoSpinalAssessments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrthoSpinalAssessment>> PostOrthoSpinalAssessment(OrthoSpinalAssessment orthoSpinalAssessment)
        {
            _context.OrthoSpinalAssessment.Add(orthoSpinalAssessment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrthoSpinalAssessment", new { id = orthoSpinalAssessment.RefId }, orthoSpinalAssessment);
        }

        // DELETE: api/OrthoSpinalAssessments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrthoSpinalAssessment>> DeleteOrthoSpinalAssessment(int id)
        {
            var orthoSpinalAssessment = await _context.OrthoSpinalAssessment.FindAsync(id);
            if (orthoSpinalAssessment == null)
            {
                return NotFound();
            }

            _context.OrthoSpinalAssessment.Remove(orthoSpinalAssessment);
            await _context.SaveChangesAsync();

            return orthoSpinalAssessment;
        }

        private bool OrthoSpinalAssessmentExists(int id)
        {
            return _context.OrthoSpinalAssessment.Any(e => e.RefId == id);
        }
    }
}
