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
    public class WorkOrderItemsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public WorkOrderItemsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/WorkOrderItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkOrderItems>>> GetWorkOrderItems()
        {
            return await _context.WorkOrderItems.ToListAsync();
        }

        // GET: api/WorkOrderItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkOrderItems>> GetWorkOrderItems(int id)
        {
            var workOrderItems = await _context.WorkOrderItems.FindAsync(id);

            if (workOrderItems == null)
            {
                return NotFound();
            }

            return workOrderItems;
        }

        // PUT: api/WorkOrderItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkOrderItems(int id, WorkOrderItems workOrderItems)
        {
            if (id != workOrderItems.OrderNo)
            {
                return BadRequest();
            }

            _context.Entry(workOrderItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkOrderItemsExists(id))
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

        // POST: api/WorkOrderItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WorkOrderItems>> PostWorkOrderItems(WorkOrderItems workOrderItems)
        {
            _context.WorkOrderItems.Add(workOrderItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkOrderItems", new { id = workOrderItems.OrderNo }, workOrderItems);
        }

        // DELETE: api/WorkOrderItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkOrderItems>> DeleteWorkOrderItems(int id)
        {
            var workOrderItems = await _context.WorkOrderItems.FindAsync(id);
            if (workOrderItems == null)
            {
                return NotFound();
            }

            _context.WorkOrderItems.Remove(workOrderItems);
            await _context.SaveChangesAsync();

            return workOrderItems;
        }

        private bool WorkOrderItemsExists(int id)
        {
            return _context.WorkOrderItems.Any(e => e.OrderNo == id);
        }
    }
}
