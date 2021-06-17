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
    public class LoanInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public LoanInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/LoanInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanInformation>>> GetLoanInformation()
        {
            return await _context.LoanInformation.ToListAsync();
        }

        // GET: api/LoanInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoanInformation>> GetLoanInformation(string id)
        {
            var loanInformation = await _context.LoanInformation.FindAsync(id);

            if (loanInformation == null)
            {
                return NotFound();
            }

            return loanInformation;
        }

        // PUT: api/LoanInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoanInformation(string id, LoanInformation loanInformation)
        {
            if (id != loanInformation.LoanFormNo)
            {
                return BadRequest();
            }

            _context.Entry(loanInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanInformationExists(id))
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

        // POST: api/LoanInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LoanInformation>> PostLoanInformation(LoanInformation loanInformation)
        {
            _context.LoanInformation.Add(loanInformation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LoanInformationExists(loanInformation.LoanFormNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLoanInformation", new { id = loanInformation.LoanFormNo }, loanInformation);
        }

        // DELETE: api/LoanInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LoanInformation>> DeleteLoanInformation(string id)
        {
            var loanInformation = await _context.LoanInformation.FindAsync(id);
            if (loanInformation == null)
            {
                return NotFound();
            }

            _context.LoanInformation.Remove(loanInformation);
            await _context.SaveChangesAsync();

            return loanInformation;
        }

        private bool LoanInformationExists(string id)
        {
            return _context.LoanInformation.Any(e => e.LoanFormNo == id);
        }
    }
}
