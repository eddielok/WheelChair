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
    public class QuestWcbsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public QuestWcbsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/QuestWcbs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestWcb>>> GetQuestWcb()
        {
            return await _context.QuestWcb.ToListAsync();
        }

        // GET: api/QuestWcbs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestWcb>> GetQuestWcb(int id)
        {
            var questWcb = await _context.QuestWcb.FindAsync(id);

            if (questWcb == null)
            {
                return NotFound();
            }

            return questWcb;
        }

        // PUT: api/QuestWcbs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestWcb(int id, QuestWcb questWcb)
        {
            if (id != questWcb.RefId)
            {
                return BadRequest();
            }

            _context.Entry(questWcb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestWcbExists(id))
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

        // POST: api/QuestWcbs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuestWcb>> PostQuestWcb(QuestWcb questWcb)
        {
            questWcb.RefId = 0;

            _context.QuestWcb.Add(questWcb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestWcb", new { id = questWcb.RefId }, questWcb);
        }

        // DELETE: api/QuestWcbs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuestWcb>> DeleteQuestWcb(int id)
        {
            var questWcb = await _context.QuestWcb.FindAsync(id);
            if (questWcb == null)
            {
                return NotFound();
            }

            _context.QuestWcb.Remove(questWcb);
            await _context.SaveChangesAsync();

            return questWcb;
        }

        private bool QuestWcbExists(int id)
        {
            return _context.QuestWcb.Any(e => e.RefId == id);
        }
    }
}
