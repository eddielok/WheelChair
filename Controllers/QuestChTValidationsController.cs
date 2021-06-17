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
    public class QuestChTValidationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public QuestChTValidationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/QuestChTValidations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestChTValidation>>> GetQuestChTValidation()
        {
            return await _context.QuestChTValidation.ToListAsync();
        }

        // GET: api/QuestChTValidations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestChTValidation>> GetQuestChTValidation(int id)
        {
            var questChTValidation = await _context.QuestChTValidation.FindAsync(id);

            if (questChTValidation == null)
            {
                return NotFound();
            }

            return questChTValidation;
        }

        // PUT: api/QuestChTValidations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestChTValidation(int id, QuestChTValidation questChTValidation)
        {
            if (id != questChTValidation.RefId)
            {
                return BadRequest();
            }

            _context.Entry(questChTValidation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestChTValidationExists(id))
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

        // POST: api/QuestChTValidations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuestChTValidation>> PostQuestChTValidation(QuestChTValidation questChTValidation)
        {
            _context.QuestChTValidation.Add(questChTValidation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestChTValidation", new { id = questChTValidation.RefId }, questChTValidation);
        }

        // DELETE: api/QuestChTValidations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuestChTValidation>> DeleteQuestChTValidation(int id)
        {
            var questChTValidation = await _context.QuestChTValidation.FindAsync(id);
            if (questChTValidation == null)
            {
                return NotFound();
            }

            _context.QuestChTValidation.Remove(questChTValidation);
            await _context.SaveChangesAsync();

            return questChTValidation;
        }

        private bool QuestChTValidationExists(int id)
        {
            return _context.QuestChTValidation.Any(e => e.RefId == id);
        }
    }
}
