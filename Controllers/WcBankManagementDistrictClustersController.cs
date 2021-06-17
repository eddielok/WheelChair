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
    public class WcBankManagementDistrictClustersController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WcBankManagementDistrictClustersController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WcBankManagementDistrictClusters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WcBankManagementDistrictCluster>>> GetWcBankManagementDistrictCluster()
        {
            return await _context.WcBankManagementDistrictCluster.ToListAsync();
        }

        // GET: api/WcBankManagementDistrictClusters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WcBankManagementDistrictCluster>> GetWcBankManagementDistrictCluster(int id)
        {
            var wcBankManagementDistrictCluster = await _context.WcBankManagementDistrictCluster.FindAsync(id);

            if (wcBankManagementDistrictCluster == null)
            {
                return NotFound();
            }

            return wcBankManagementDistrictCluster;
        }

        // PUT: api/WcBankManagementDistrictClusters/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWcBankManagementDistrictCluster(int id, WcBankManagementDistrictCluster wcBankManagementDistrictCluster)
        {
            if (id != wcBankManagementDistrictCluster.RefId)
            {
                return BadRequest();
            }

            _context.Entry(wcBankManagementDistrictCluster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WcBankManagementDistrictClusterExists(id))
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

        // POST: api/WcBankManagementDistrictClusters
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WcBankManagementDistrictCluster>> PostWcBankManagementDistrictCluster(WcBankManagementDistrictCluster wcBankManagementDistrictCluster)
        {
            _context.WcBankManagementDistrictCluster.Add(wcBankManagementDistrictCluster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWcBankManagementDistrictCluster", new { id = wcBankManagementDistrictCluster.RefId }, wcBankManagementDistrictCluster);
        }

        // DELETE: api/WcBankManagementDistrictClusters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WcBankManagementDistrictCluster>> DeleteWcBankManagementDistrictCluster(int id)
        {
            var wcBankManagementDistrictCluster = await _context.WcBankManagementDistrictCluster.FindAsync(id);
            if (wcBankManagementDistrictCluster == null)
            {
                return NotFound();
            }

            _context.WcBankManagementDistrictCluster.Remove(wcBankManagementDistrictCluster);
            await _context.SaveChangesAsync();

            return wcBankManagementDistrictCluster;
        }

        private bool WcBankManagementDistrictClusterExists(int id)
        {
            return _context.WcBankManagementDistrictCluster.Any(e => e.RefId == id);
        }
    }
}
