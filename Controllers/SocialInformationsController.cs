using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class SocialInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public SocialInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/SocialInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialInformation>>> GetSocialInformation()
        {
            return await _context.SocialInformation.ToListAsync();
        }

        // GET: api/SocialInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SocialInformation>> GetSocialInformation(int id)
        {
            var socialInformation = await _context.SocialInformation.FindAsync(id);

            if (socialInformation == null)
            {
                return NotFound();
            }

            return socialInformation;
        }

        // PUT: api/SocialInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialInformation(int id, SocialInformation socialInformation)
        {
            if (id != socialInformation.RefId)
            {
                return BadRequest();
            }

            _context.Entry(socialInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialInformationExists(id))
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

        // POST: api/SocialInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SocialInformation>> PostSocialInformation(SocialInformation socialInformation)
        {
            _context.SocialInformation.Add(socialInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSocialInformation", new { id = socialInformation.RefId }, socialInformation);
        }

        // DELETE: api/SocialInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SocialInformation>> DeleteSocialInformation(int id)
        {
            var socialInformation = await _context.SocialInformation.FindAsync(id);
            if (socialInformation == null)
            {
                return NotFound();
            }

            _context.SocialInformation.Remove(socialInformation);
            await _context.SaveChangesAsync();

            return socialInformation;
        }

        private bool SocialInformationExists(int id)
        {
            return _context.SocialInformation.Any(e => e.RefId == id);
        }
    }
}
