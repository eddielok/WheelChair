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
    public class SocialInformationsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public SocialInformationsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var socialInformations = _context.SocialInformation.ToListAsync();
            return Ok(JsonConvert.SerializeObject(socialInformations.Result));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var socialInformations = _context.SocialInformation.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(socialInformations));

        }
        [HttpGet("seatNoRoute", Name = "SocialInformationGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleSocialInformation = await _context.SocialInformation.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleSocialInformation));
        }

        [HttpPost]
        public IActionResult Post(SocialInformation socialInformation) {
            _context.Add(socialInformation);
            _context.SaveChanges();

            var location = "../SocialInformations/" + socialInformation.RefId;

            return Created(location, socialInformation);
        }

        [HttpPut]
        public IActionResult Put(SocialInformation socialInformation) {

            try {
                _context.Update(socialInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!SocialInformationExists(socialInformation.RefId))
                    return NotFound();
                else
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var socialInformation = _context.SocialInformation.Find(refId);
            _context.SocialInformation.Remove(socialInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool SocialInformationExists(int id) {
            return _context.SocialInformation.Any(e => e.RefId == id);
        }
    }
}