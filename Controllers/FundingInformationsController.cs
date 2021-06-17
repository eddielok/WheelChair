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
    public class FundingInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public FundingInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/FundingInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FundingInformation>>> GetFundingInformation()
        {
            return await _context.FundingInformation.ToListAsync();
        }

        // GET: api/FundingInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FundingInformation>> GetFundingInformation(int id)
        {
            var fundingInformation = await _context.FundingInformation.FindAsync(id);

            if (fundingInformation == null)
            {
                return NotFound();
            }

            return fundingInformation;
        }

        // PUT: api/FundingInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFundingInformation(int id, FundingInformation fundingInformation)
        {
            if (id != fundingInformation.RefId)
            {
                return BadRequest();
            }

            _context.Entry(fundingInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FundingInformationExists(id))
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

        // POST: api/FundingInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FundingInformation>> PostFundingInformation(FundingInformation fundingInformation)
        {
            _context.FundingInformation.Add(fundingInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFundingInformation", new { id = fundingInformation.RefId }, fundingInformation);
        }

        // DELETE: api/FundingInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FundingInformation>> DeleteFundingInformation(int id)
        {
            var fundingInformation = await _context.FundingInformation.FindAsync(id);
            if (fundingInformation == null)
            {
                return NotFound();
            }

            _context.FundingInformation.Remove(fundingInformation);
            await _context.SaveChangesAsync();

            return fundingInformation;
        }

        private bool FundingInformationExists(int id)
        {
            return _context.FundingInformation.Any(e => e.RefId == id);
        }
    }
}
