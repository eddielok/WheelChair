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
    public class LoanedArticlesController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public LoanedArticlesController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/LoanedArticles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanedArticle>>> GetLoanedArticle()
        {
            return await _context.LoanedArticle.ToListAsync();
        }

        // GET: api/LoanedArticles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoanedArticle>> GetLoanedArticle(int id)
        {
            var loanedArticle = await _context.LoanedArticle.FindAsync(id);

            if (loanedArticle == null)
            {
                return NotFound();
            }

            return loanedArticle;
        }

        // PUT: api/LoanedArticles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoanedArticle(int id, LoanedArticle loanedArticle)
        {
            if (id != loanedArticle.RefId)
            {
                return BadRequest();
            }

            _context.Entry(loanedArticle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanedArticleExists(id))
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

        // POST: api/LoanedArticles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LoanedArticle>> PostLoanedArticle(LoanedArticle loanedArticle)
        {
            _context.LoanedArticle.Add(loanedArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoanedArticle", new { id = loanedArticle.RefId }, loanedArticle);
        }

        // DELETE: api/LoanedArticles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LoanedArticle>> DeleteLoanedArticle(int id)
        {
            var loanedArticle = await _context.LoanedArticle.FindAsync(id);
            if (loanedArticle == null)
            {
                return NotFound();
            }

            _context.LoanedArticle.Remove(loanedArticle);
            await _context.SaveChangesAsync();

            return loanedArticle;
        }

        private bool LoanedArticleExists(int id)
        {
            return _context.LoanedArticle.Any(e => e.RefId == id);
        }
    }
}
