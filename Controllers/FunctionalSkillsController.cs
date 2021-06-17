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
    public class FunctionalSkillsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public FunctionalSkillsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/FunctionalSkills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FunctionalSkills>>> GetFunctionalSkills()
        {
            return await _context.FunctionalSkills.ToListAsync();
        }

        // GET: api/FunctionalSkills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FunctionalSkills>> GetFunctionalSkills(int id)
        {
            var functionalSkills = await _context.FunctionalSkills.FindAsync(id);

            if (functionalSkills == null)
            {
                return NotFound();
            }

            return functionalSkills;
        }

        // PUT: api/FunctionalSkills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFunctionalSkills(int id, FunctionalSkills functionalSkills)
        {
            if (id != functionalSkills.RefId)
            {
                return BadRequest();
            }

            _context.Entry(functionalSkills).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FunctionalSkillsExists(id))
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

        // POST: api/FunctionalSkills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FunctionalSkills>> PostFunctionalSkills(FunctionalSkills functionalSkills)
        {
            _context.FunctionalSkills.Add(functionalSkills);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFunctionalSkills", new { id = functionalSkills.RefId }, functionalSkills);
        }

        // DELETE: api/FunctionalSkills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FunctionalSkills>> DeleteFunctionalSkills(int id)
        {
            var functionalSkills = await _context.FunctionalSkills.FindAsync(id);
            if (functionalSkills == null)
            {
                return NotFound();
            }

            _context.FunctionalSkills.Remove(functionalSkills);
            await _context.SaveChangesAsync();

            return functionalSkills;
        }

        private bool FunctionalSkillsExists(int id)
        {
            return _context.FunctionalSkills.Any(e => e.RefId == id);
        }
    }
}
