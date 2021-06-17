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
    public class WcBankManagementSeatSupportLevelsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WcBankManagementSeatSupportLevelsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WcBankManagementSeatSupportLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WcBankManagementSeatSupportLevel>>> GetWcBankManagementSeatSupportLevel()
        {
            return await _context.WcBankManagementSeatSupportLevel.ToListAsync();
        }

        // GET: api/WcBankManagementSeatSupportLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WcBankManagementSeatSupportLevel>> GetWcBankManagementSeatSupportLevel(int id)
        {
            var wcBankManagementSeatSupportLevel = await _context.WcBankManagementSeatSupportLevel.FindAsync(id);

            if (wcBankManagementSeatSupportLevel == null)
            {
                return NotFound();
            }

            return wcBankManagementSeatSupportLevel;
        }

        // PUT: api/WcBankManagementSeatSupportLevels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWcBankManagementSeatSupportLevel(int id, WcBankManagementSeatSupportLevel wcBankManagementSeatSupportLevel)
        {
            if (id != wcBankManagementSeatSupportLevel.RefId)
            {
                return BadRequest();
            }

            _context.Entry(wcBankManagementSeatSupportLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WcBankManagementSeatSupportLevelExists(id))
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

        // POST: api/WcBankManagementSeatSupportLevels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WcBankManagementSeatSupportLevel>> PostWcBankManagementSeatSupportLevel(WcBankManagementSeatSupportLevel wcBankManagementSeatSupportLevel)
        {
            _context.WcBankManagementSeatSupportLevel.Add(wcBankManagementSeatSupportLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWcBankManagementSeatSupportLevel", new { id = wcBankManagementSeatSupportLevel.RefId }, wcBankManagementSeatSupportLevel);
        }

        // DELETE: api/WcBankManagementSeatSupportLevels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WcBankManagementSeatSupportLevel>> DeleteWcBankManagementSeatSupportLevel(int id)
        {
            var wcBankManagementSeatSupportLevel = await _context.WcBankManagementSeatSupportLevel.FindAsync(id);
            if (wcBankManagementSeatSupportLevel == null)
            {
                return NotFound();
            }

            _context.WcBankManagementSeatSupportLevel.Remove(wcBankManagementSeatSupportLevel);
            await _context.SaveChangesAsync();

            return wcBankManagementSeatSupportLevel;
        }

        private bool WcBankManagementSeatSupportLevelExists(int id)
        {
            return _context.WcBankManagementSeatSupportLevel.Any(e => e.RefId == id);
        }
    }
}
