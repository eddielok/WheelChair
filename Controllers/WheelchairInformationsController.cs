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
    public class WheelchairInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WheelchairInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WheelchairInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WheelchairInformation>>> GetWheelchairInformation()
        {
            return await _context.WheelchairInformation.ToListAsync();
        }

        // GET: api/WheelchairInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WheelchairInformation>> GetWheelchairInformation(string id)
        {
            var wheelchairInformation = await _context.WheelchairInformation.FindAsync(id);

            if (wheelchairInformation == null)
            {
                return NotFound();
            }

            return wheelchairInformation;
        }

        // PUT: api/WheelchairInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWheelchairInformation(string id, WheelchairInformation wheelchairInformation)
        {
            if (id != wheelchairInformation.WheelchairNo)
            {
                return BadRequest();
            }

            _context.Entry(wheelchairInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WheelchairInformationExists(id))
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

        // POST: api/WheelchairInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WheelchairInformation>> PostWheelchairInformation(WheelchairInformation wheelchairInformation)
        {
            _context.WheelchairInformation.Add(wheelchairInformation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WheelchairInformationExists(wheelchairInformation.WheelchairNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWheelchairInformation", new { id = wheelchairInformation.WheelchairNo }, wheelchairInformation);
        }

        // DELETE: api/WheelchairInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WheelchairInformation>> DeleteWheelchairInformation(string id)
        {
            var wheelchairInformation = await _context.WheelchairInformation.FindAsync(id);
            if (wheelchairInformation == null)
            {
                return NotFound();
            }

            _context.WheelchairInformation.Remove(wheelchairInformation);
            await _context.SaveChangesAsync();

            return wheelchairInformation;
        }

        private bool WheelchairInformationExists(string id)
        {
            return _context.WheelchairInformation.Any(e => e.WheelchairNo == id);
        }
    }
}
