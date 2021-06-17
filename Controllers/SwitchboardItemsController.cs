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
    public class SwitchboardItemsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public SwitchboardItemsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/SwitchboardItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SwitchboardItems>>> GetSwitchboardItems()
        {
            return await _context.SwitchboardItems.ToListAsync();
        }

        // GET: api/SwitchboardItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchboardItems>> GetSwitchboardItems(int? id)
        {
            var switchboardItems = await _context.SwitchboardItems.FindAsync(id);

            if (switchboardItems == null)
            {
                return NotFound();
            }

            return switchboardItems;
        }

        // PUT: api/SwitchboardItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSwitchboardItems(int? id, SwitchboardItems switchboardItems)
        {
            if (id != switchboardItems.SwitchboardId)
            {
                return BadRequest();
            }

            _context.Entry(switchboardItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SwitchboardItemsExists(id))
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

        // POST: api/SwitchboardItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SwitchboardItems>> PostSwitchboardItems(SwitchboardItems switchboardItems)
        {
            _context.SwitchboardItems.Add(switchboardItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSwitchboardItems", new { id = switchboardItems.SwitchboardId }, switchboardItems);
        }

        // DELETE: api/SwitchboardItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SwitchboardItems>> DeleteSwitchboardItems(int? id)
        {
            var switchboardItems = await _context.SwitchboardItems.FindAsync(id);
            if (switchboardItems == null)
            {
                return NotFound();
            }

            _context.SwitchboardItems.Remove(switchboardItems);
            await _context.SaveChangesAsync();

            return switchboardItems;
        }

        private bool SwitchboardItemsExists(int? id)
        {
            return _context.SwitchboardItems.Any(e => e.SwitchboardId == id);
        }
    }
}
