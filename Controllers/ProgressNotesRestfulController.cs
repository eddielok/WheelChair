using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class ProgressNotesRestfulController : Controller {
        private readonly WheelChairContext _context;

        public ProgressNotesRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var progressNotes = _context.ProgressNote.ToListAsync();
            return Ok(JsonConvert.SerializeObject(progressNotes.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var progressNotes = _context.ProgressNote.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(progressNotes));
        }

        [HttpGet("seatNoRoute", Name = "ProgressNoteGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleProgressNote = await _context.ProgressNote.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleProgressNote));
        }

        [HttpPost]
        public IActionResult Post(ProgressNote progressNote) {
            // progressNote.RefId = 0;

            _context.Add(progressNote);
            _context.SaveChanges();

            var location = "../ProgressNotes/" + progressNote.RefId;

            return Created(location, progressNote);
        }

        [HttpPut]
        public IActionResult Put(ProgressNote progressNote) {
            try {
                _context.Update(progressNote);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ProgressNoteExists(progressNote.RefId))  
                    return NotFound();
                else 
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var progressNote = _context.ProgressNote.Find(refId);
            _context.ProgressNote.Remove(progressNote);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool ProgressNoteExists(int id) {
            return _context.ProgressNote.Any(e => e.RefId == id);
        }
    }
}