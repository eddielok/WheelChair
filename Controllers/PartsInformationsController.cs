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
    public class PartsInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public PartsInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/PartsInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartsInformation>>> GetPartsInformation()
        {
            return await _context.PartsInformation.ToListAsync();
        }

        // GET: api/PartsInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartsInformation>> GetPartsInformation(int id)
        {
            var partsInformation = await _context.PartsInformation.FindAsync(id);

            if (partsInformation == null)
            {
                return NotFound();
            }

            return partsInformation;
        }

        // PUT: api/PartsInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartsInformation(int id, PartsInformation partsInformation)
        {
            if (id != partsInformation.RefId)
            {
                return BadRequest();
            }

            _context.Entry(partsInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartsInformationExists(id))
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

        // POST: api/PartsInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PartsInformation>> PostPartsInformation(PartsInformation partsInformation)
        {
            _context.PartsInformation.Add(partsInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartsInformation", new { id = partsInformation.RefId }, partsInformation);
        }

        // DELETE: api/PartsInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PartsInformation>> DeletePartsInformation(int id)
        {
            var partsInformation = await _context.PartsInformation.FindAsync(id);
            if (partsInformation == null)
            {
                return NotFound();
            }

            _context.PartsInformation.Remove(partsInformation);
            await _context.SaveChangesAsync();

            return partsInformation;
        }

        private bool PartsInformationExists(int id)
        {
            return _context.PartsInformation.Any(e => e.RefId == id);
        }
    }
}
