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
    public class WheelchairDimensionsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WheelchairDimensionsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WheelchairDimensions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WheelchairDimension>>> GetWheelchairDimension()
        {
            return await _context.WheelchairDimension.ToListAsync();
        }

        // GET: api/WheelchairDimensions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WheelchairDimension>> GetWheelchairDimension(int id)
        {
            var wheelchairDimension = await _context.WheelchairDimension.FindAsync(id);

            if (wheelchairDimension == null)
            {
                return NotFound();
            }

            return wheelchairDimension;
        }

        // PUT: api/WheelchairDimensions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWheelchairDimension(int id, WheelchairDimension wheelchairDimension)
        {
            if (id != wheelchairDimension.RefId)
            {
                return BadRequest();
            }

            _context.Entry(wheelchairDimension).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WheelchairDimensionExists(id))
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

        // POST: api/WheelchairDimensions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WheelchairDimension>> PostWheelchairDimension(WheelchairDimension wheelchairDimension)
        {
            _context.WheelchairDimension.Add(wheelchairDimension);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWheelchairDimension", new { id = wheelchairDimension.RefId }, wheelchairDimension);
        }

        // DELETE: api/WheelchairDimensions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WheelchairDimension>> DeleteWheelchairDimension(int id)
        {
            var wheelchairDimension = await _context.WheelchairDimension.FindAsync(id);
            if (wheelchairDimension == null)
            {
                return NotFound();
            }

            _context.WheelchairDimension.Remove(wheelchairDimension);
            await _context.SaveChangesAsync();

            return wheelchairDimension;
        }

        private bool WheelchairDimensionExists(int id)
        {
            return _context.WheelchairDimension.Any(e => e.RefId == id);
        }
    }
}
