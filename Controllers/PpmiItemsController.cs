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
    public class PpmiItemsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public PpmiItemsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/PpmiItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PpmiItems>>> GetPpmiItems()
        {
            return await _context.PpmiItems.ToListAsync();
        }

        // GET: api/PpmiItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PpmiItems>> GetPpmiItems(int id)
        {
            var ppmiItems = await _context.PpmiItems.FindAsync(id);

            if (ppmiItems == null)
            {
                return NotFound();
            }

            return ppmiItems;
        }

        // PUT: api/PpmiItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPpmiItems(int id, PpmiItems ppmiItems)
        {
            if (id != ppmiItems.RefId)
            {
                return BadRequest();
            }

            _context.Entry(ppmiItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PpmiItemsExists(id))
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

        // POST: api/PpmiItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PpmiItems>> PostPpmiItems(PpmiItems ppmiItems)
        {
            _context.PpmiItems.Add(ppmiItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPpmiItems", new { id = ppmiItems.RefId }, ppmiItems);
        }

        // DELETE: api/PpmiItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PpmiItems>> DeletePpmiItems(int id)
        {
            var ppmiItems = await _context.PpmiItems.FindAsync(id);
            if (ppmiItems == null)
            {
                return NotFound();
            }

            _context.PpmiItems.Remove(ppmiItems);
            await _context.SaveChangesAsync();

            return ppmiItems;
        }

        private bool PpmiItemsExists(int id)
        {
            return _context.PpmiItems.Any(e => e.RefId == id);
        }
    }
}
