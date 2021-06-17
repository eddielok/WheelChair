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
    public class MedicalInformationsrRestfulController : Controller {
        private readonly WheelChairContext _context;
         
        public MedicalInformationsrRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var medicalInformations = _context.MedicalInformation.ToListAsync();
            return Ok(JsonConvert.SerializeObject(medicalInformations.Result));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var medicalInformations = _context.MedicalInformation.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(medicalInformations));
        }
        [HttpGet("seatNoRoute", Name = "MedicalInformationGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleMedicalInformation = await _context.MedicalInformation.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleMedicalInformation));
        }

        [HttpPost]
        public IActionResult Post(MedicalInformation medicalInformation) {
            _context.Add(medicalInformation);
            _context.SaveChanges();

            var location = "../MedicalInformations/" + medicalInformation.RefId;

            return Created(location, medicalInformation);
        }

        [HttpPut]
        public IActionResult Put(MedicalInformation medicalInformation) {
            try {
                _context.Update(medicalInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!MedicalInformationExists(medicalInformation.RefId))
                    return NotFound();
                else
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var medicalInformation = _context.MedicalInformation.Find(refId);
            _context.MedicalInformation.Remove(medicalInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool MedicalInformationExists(int id) {
            return _context.MedicalInformation.Any(e => e.RefId == id);
        }
    }
}