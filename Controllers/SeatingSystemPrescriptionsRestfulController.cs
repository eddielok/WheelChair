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
    public class SeatingSystemPrescriptionsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public SeatingSystemPrescriptionsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var seatingSystemPrescriptions = _context.SeatingSystemPrescription.ToListAsync();
            return Ok(JsonConvert.SerializeObject(seatingSystemPrescriptions.Result));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var seatingSystemPrescriptions = _context.SeatingSystemPrescription.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(seatingSystemPrescriptions));
        }
        [HttpGet("seatNoRoute", Name = "SeatingSystemPrescriptionGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleSeatingSystemPrescription = await _context.SeatingSystemPrescription.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleSeatingSystemPrescription));
        }

        [HttpPost]
        public IActionResult Post(SeatingSystemPrescription seatingSystemPrescription) {
            _context.Add(seatingSystemPrescription);
            _context.SaveChanges();

            var location = "../SeatingSystemPrescriptions/" + seatingSystemPrescription.RefId;

            return Created(location, seatingSystemPrescription);
        }

        [HttpPut]
        public IActionResult Put(SeatingSystemPrescription seatingSystemPrescription) {
            try {
                _context.Update(seatingSystemPrescription);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!SeatingSystemPrescriptionExists(seatingSystemPrescription.RefId)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {

            var seatingSystemPrescription = _context.SeatingSystemPrescription.Find(refId);
            _context.SeatingSystemPrescription.Remove(seatingSystemPrescription);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool SeatingSystemPrescriptionExists(int id) {
            return _context.SeatingSystemPrescription.Any(e => e.RefId == id);
        }
    }
}