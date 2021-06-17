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
    public class WheelchairSpecificationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WheelchairSpecificationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WheelchairSpecifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WheelchairSpecification>>> GetWheelchairSpecification()
        {
            return await _context.WheelchairSpecification.ToListAsync();
        }

        // GET: api/WheelchairSpecifications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WheelchairSpecification>> GetWheelchairSpecification(int id)
        {
            var wheelchairSpecification = await _context.WheelchairSpecification.FindAsync(id);

            if (wheelchairSpecification == null)
            {
                return NotFound();
            }

            return wheelchairSpecification;
        }

        // PUT: api/WheelchairSpecifications/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWheelchairSpecification(int id, WheelchairSpecification wheelchairSpecification)
        {
            if (id != wheelchairSpecification.RefId)
            {
                return BadRequest();
            }

            _context.Entry(wheelchairSpecification).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WheelchairSpecificationExists(id))
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

        // POST: api/WheelchairSpecifications
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WheelchairSpecification>> PostWheelchairSpecification(WheelchairSpecification wheelchairSpecification)
        {
            _context.WheelchairSpecification.Add(wheelchairSpecification);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWheelchairSpecification", new { id = wheelchairSpecification.RefId }, wheelchairSpecification);
        }

        // DELETE: api/WheelchairSpecifications/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WheelchairSpecification>> DeleteWheelchairSpecification(int id)
        {
            var wheelchairSpecification = await _context.WheelchairSpecification.FindAsync(id);
            if (wheelchairSpecification == null)
            {
                return NotFound();
            }

            _context.WheelchairSpecification.Remove(wheelchairSpecification);
            await _context.SaveChangesAsync();

            return wheelchairSpecification;
        }

        private bool WheelchairSpecificationExists(int id)
        {
            return _context.WheelchairSpecification.Any(e => e.RefId == id);
        }
    }
}
