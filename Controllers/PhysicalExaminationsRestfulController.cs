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
    public class PhysicalExaminationsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public PhysicalExaminationsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var physicalExaminations = _context.PhysicalExamination.ToListAsync();
            return Ok(JsonConvert.SerializeObject(physicalExaminations.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var physicalExaminations = _context.PhysicalExamination.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(physicalExaminations));

        }
        [HttpGet("seatNoRoute", Name = "PhysicalExaminationGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multiplePhysicalExamination = await _context.PhysicalExamination.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multiplePhysicalExamination));
        }

        [HttpPost]
        public IActionResult Post(PhysicalExamination physicalExamination) {
            _context.Add(physicalExamination);
            _context.SaveChanges();

            var location = "../PhysicalExaminations/" + physicalExamination.RefId;

            return Created(location, physicalExamination);
        }

        [HttpPut]
        public IActionResult Put(PhysicalExamination physicalExamination) {
            try {
                _context.Update(physicalExamination);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!PhysicalExaminationExists(physicalExamination.RefId))
                    return NotFound();
                else
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var physicalExamination = _context.PhysicalExamination.Find(refId);
            _context.PhysicalExamination.Remove(physicalExamination);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool PhysicalExaminationExists(int id) {
            return _context.PhysicalExamination.Any(e => e.RefId == id);
        }

    }
}