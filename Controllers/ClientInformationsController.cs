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
    public class ClientInformationsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public ClientInformationsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/ClientInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientInformation>>> GetClientInformation()
        {
            return await _context.ClientInformation.ToListAsync();
        }

        // GET: api/ClientInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientInformation>> GetClientInformation(string id)
        {
            var clientInformation = await _context.ClientInformation.FindAsync(id);

            if (clientInformation == null)
            {
                return NotFound();
            }

            return clientInformation;
        }

        // PUT: api/ClientInformations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClientInformation(string id, ClientInformation clientInformation)
        {
            if (id != clientInformation.SeatNo)
            {
                return BadRequest();
            }

            _context.Entry(clientInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientInformationExists(id))
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

        // POST: api/ClientInformations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClientInformation>> PostClientInformation(ClientInformation clientInformation)
        {
            _context.ClientInformation.Add(clientInformation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClientInformationExists(clientInformation.SeatNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetClientInformation", new { id = clientInformation.SeatNo }, clientInformation);
        }

        // DELETE: api/ClientInformations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClientInformation>> DeleteClientInformation(string id)
        {
            var clientInformation = await _context.ClientInformation.FindAsync(id);
            if (clientInformation == null)
            {
                return NotFound();
            }

            _context.ClientInformation.Remove(clientInformation);
            await _context.SaveChangesAsync();

            return clientInformation;
        }

        private bool ClientInformationExists(string id)
        {
            return _context.ClientInformation.Any(e => e.SeatNo == id);
        }
    }
}
