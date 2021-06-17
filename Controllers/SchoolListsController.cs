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
    public class SchoolListsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public SchoolListsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/SchoolLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SchoolList>>> GetSchoolList()
        {
            return await _context.SchoolList.ToListAsync();
        }

        // GET: api/SchoolLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolList>> GetSchoolList(int id)
        {
            var schoolList = await _context.SchoolList.FindAsync(id);

            if (schoolList == null)
            {
                return NotFound();
            }

            return schoolList;
        }

        // PUT: api/SchoolLists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchoolList(int id, SchoolList schoolList)
        {
            if (id != schoolList.RefId)
            {
                return BadRequest();
            }

            _context.Entry(schoolList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SchoolListExists(id))
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

        // POST: api/SchoolLists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SchoolList>> PostSchoolList(SchoolList schoolList)
        {
            _context.SchoolList.Add(schoolList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchoolList", new { id = schoolList.RefId }, schoolList);
        }

        // DELETE: api/SchoolLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SchoolList>> DeleteSchoolList(int id)
        {
            var schoolList = await _context.SchoolList.FindAsync(id);
            if (schoolList == null)
            {
                return NotFound();
            }

            _context.SchoolList.Remove(schoolList);
            await _context.SaveChangesAsync();

            return schoolList;
        }

        private bool SchoolListExists(int id)
        {
            return _context.SchoolList.Any(e => e.RefId == id);
        }
    }
}
