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
    public class MaintenanceLogsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public MaintenanceLogsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/MaintenanceLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceLog>>> GetMaintenanceLog()
        {
            return await _context.MaintenanceLog.ToListAsync();
        }

        // GET: api/MaintenanceLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MaintenanceLog>> GetMaintenanceLog(int id)
        {
            var maintenanceLog = await _context.MaintenanceLog.FindAsync(id);

            if (maintenanceLog == null)
            {
                return NotFound();
            }

            return maintenanceLog;
        }

        // PUT: api/MaintenanceLogs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaintenanceLog(int id, MaintenanceLog maintenanceLog)
        {
            if (id != maintenanceLog.RefId)
            {
                return BadRequest();
            }

            _context.Entry(maintenanceLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaintenanceLogExists(id))
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

        // POST: api/MaintenanceLogs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MaintenanceLog>> PostMaintenanceLog(MaintenanceLog maintenanceLog)
        {
            _context.MaintenanceLog.Add(maintenanceLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaintenanceLog", new { id = maintenanceLog.RefId }, maintenanceLog);
        }

        // DELETE: api/MaintenanceLogs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MaintenanceLog>> DeleteMaintenanceLog(int id)
        {
            var maintenanceLog = await _context.MaintenanceLog.FindAsync(id);
            if (maintenanceLog == null)
            {
                return NotFound();
            }

            _context.MaintenanceLog.Remove(maintenanceLog);
            await _context.SaveChangesAsync();

            return maintenanceLog;
        }

        private bool MaintenanceLogExists(int id)
        {
            return _context.MaintenanceLog.Any(e => e.RefId == id);
        }
    }
}
