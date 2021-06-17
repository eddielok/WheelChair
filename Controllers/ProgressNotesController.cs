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
    public class ProgressNotesController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public ProgressNotesController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/ProgressNotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressNote>>> GetProgressNote()
        {
            return await _context.ProgressNote.ToListAsync();
        }

        // GET: api/ProgressNotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgressNote>> GetProgressNote(int id)
        {
            var progressNote = await _context.ProgressNote.FindAsync(id);

            if (progressNote == null)
            {
                return NotFound();
            }

            return progressNote;
        }

        // PUT: api/ProgressNotes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgressNote(int id, ProgressNote progressNote)
        {
            if (id != progressNote.RefId)
            {
                return BadRequest();
            }

            _context.Entry(progressNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgressNoteExists(id))
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

        // POST: api/ProgressNotes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProgressNote>> PostProgressNote(ProgressNote progressNote)
        {
            _context.ProgressNote.Add(progressNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgressNote", new { id = progressNote.RefId }, progressNote);
        }

        // DELETE: api/ProgressNotes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProgressNote>> DeleteProgressNote(int id)
        {
            var progressNote = await _context.ProgressNote.FindAsync(id);
            if (progressNote == null)
            {
                return NotFound();
            }

            _context.ProgressNote.Remove(progressNote);
            await _context.SaveChangesAsync();

            return progressNote;
        }

        private bool ProgressNoteExists(int id)
        {
            return _context.ProgressNote.Any(e => e.RefId == id);
        }
    }
}
