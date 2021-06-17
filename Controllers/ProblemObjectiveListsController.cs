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
    public class ProblemObjectiveListsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public ProblemObjectiveListsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/ProblemObjectiveLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProblemObjectiveList>>> GetProblemObjectiveList()
        {
            return await _context.ProblemObjectiveList.ToListAsync();
        }

        // GET: api/ProblemObjectiveLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProblemObjectiveList>> GetProblemObjectiveList(int id)
        {
            var problemObjectiveList = await _context.ProblemObjectiveList.FindAsync(id);

            if (problemObjectiveList == null)
            {
                return NotFound();
            }

            return problemObjectiveList;
        }

        // PUT: api/ProblemObjectiveLists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProblemObjectiveList(int id, ProblemObjectiveList problemObjectiveList)
        {
            if (id != problemObjectiveList.RefId)
            {
                return BadRequest();
            }

            _context.Entry(problemObjectiveList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProblemObjectiveListExists(id))
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

        // POST: api/ProblemObjectiveLists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProblemObjectiveList>> PostProblemObjectiveList(ProblemObjectiveList problemObjectiveList)
        {
            _context.ProblemObjectiveList.Add(problemObjectiveList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProblemObjectiveList", new { id = problemObjectiveList.RefId }, problemObjectiveList);
        }

        // DELETE: api/ProblemObjectiveLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProblemObjectiveList>> DeleteProblemObjectiveList(int id)
        {
            var problemObjectiveList = await _context.ProblemObjectiveList.FindAsync(id);
            if (problemObjectiveList == null)
            {
                return NotFound();
            }

            _context.ProblemObjectiveList.Remove(problemObjectiveList);
            await _context.SaveChangesAsync();

            return problemObjectiveList;
        }

        private bool ProblemObjectiveListExists(int id)
        {
            return _context.ProblemObjectiveList.Any(e => e.RefId == id);
        }
    }
}
