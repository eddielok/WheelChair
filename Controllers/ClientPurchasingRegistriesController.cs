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
    public class ClientPurchasingRegistriesController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public ClientPurchasingRegistriesController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/ClientPurchasingRegistries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientPurchasingRegistry>>> GetClientPurchasingRegistry()
        {
            return await _context.ClientPurchasingRegistry.ToListAsync();
        }

        // GET: api/ClientPurchasingRegistries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientPurchasingRegistry>> GetClientPurchasingRegistry(int id)
        {
            var clientPurchasingRegistry = await _context.ClientPurchasingRegistry.FindAsync(id);

            if (clientPurchasingRegistry == null)
            {
                return NotFound();
            }

            return clientPurchasingRegistry;
        }

        // PUT: api/ClientPurchasingRegistries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClientPurchasingRegistry(int id, ClientPurchasingRegistry clientPurchasingRegistry)
        {
            if (id != clientPurchasingRegistry.RefId)
            {
                return BadRequest();
            }

            _context.Entry(clientPurchasingRegistry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientPurchasingRegistryExists(id))
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

        // POST: api/ClientPurchasingRegistries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClientPurchasingRegistry>> PostClientPurchasingRegistry(ClientPurchasingRegistry clientPurchasingRegistry)
        {
            _context.ClientPurchasingRegistry.Add(clientPurchasingRegistry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClientPurchasingRegistry", new { id = clientPurchasingRegistry.RefId }, clientPurchasingRegistry);
        }

        // DELETE: api/ClientPurchasingRegistries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClientPurchasingRegistry>> DeleteClientPurchasingRegistry(int id)
        {
            var clientPurchasingRegistry = await _context.ClientPurchasingRegistry.FindAsync(id);
            if (clientPurchasingRegistry == null)
            {
                return NotFound();
            }

            _context.ClientPurchasingRegistry.Remove(clientPurchasingRegistry);
            await _context.SaveChangesAsync();

            return clientPurchasingRegistry;
        }

        private bool ClientPurchasingRegistryExists(int id)
        {
            return _context.ClientPurchasingRegistry.Any(e => e.RefId == id);
        }
    }
}
